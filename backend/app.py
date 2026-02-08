import os  
import base64  
import json  
from io import BytesIO  
from flask import Flask, request, jsonify, send_from_directory  
from flask_cors import CORS  
import google.generativeai as genai  
from PIL import Image  
from dotenv import load_dotenv  
load_dotenv()  
app = Flask(__name__, static_folder='../frontend/dist', static_url_path='')  
CORS(app)  
# Configure Gemini API  
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')  
if GEMINI_API_KEY:  
    genai.configure(api_key=GEMINI_API_KEY)  
# ==================== API Routes ====================  
@app.route('/api/analyze-product', methods=['POST'])  
def analyze_product():  
    """Analyze product image using Gemini Vision"""  
    try:  
        if 'image' not in request.files:  
            return jsonify({'error': 'No image provided'}), 400  
          
        image_file = request.files['image']  
        platform = request.form.get('platform', 'amazon')  
          
        # Read image file  
        image_data = image_file.read()  
        image = Image.open(BytesIO(image_data))  
          
        # Prepare prompt based on platform  
        prompts = {  
            'amazon': """Please analyze this product image and provide the following information (in English):
1. Product category (one word or phrase)
2. Product description (2-3 sentences)
3. Listing suggestions (3-4 items, one sentence each)
4. Product specifications (5 items, format: attribute: value)  
Please return in JSON format as follows:  
{  
  "category": "Product Category",  
  "description": "Product Description",  
  "suggestions": ["Suggestion 1", "Suggestion 2", "Suggestion 3"],  
  "specifications": ["Spec 1", "Spec 2", "Spec 3", "Spec 4", "Spec 5"]  
}""",  
            'taobao': """请分析这张产品图片，提供以下信息（用简体中文回答）：
1. 产品类别（一个词或短语）
2. 产品描述（2-3句话）
3. 上架建议（3-4条，每条一句话）
4. 产品规格（5条，格式：属性名：属性值）  
请以JSON格式返回，格式如下：  
{  
  "category": "产品类别",  
  "description": "产品描述",  
  "suggestions": ["建议1", "建议2", "建议3"],  
  "specifications": ["规格1", "规格2", "规格3", "规格4", "规格5"]  
}""",  
            'jd': """请分析这张产品图片，提供以下信息（用简体中文回答）：
1. 产品类别（一个词或短语）
2. 产品描述（2-3句话）
3. 上架建议（3-4条，每条一句话）
4. 产品规格（5条，格式：属性名：属性值）  
请以JSON格式返回，格式如下：  
{  
  "category": "产品类别",  
  "description": "产品描述",  
  "suggestions": ["建议1", "建议2", "建议3"],  
  "specifications": ["规格1", "规格2", "规格3", "规格4", "规格5"]  
}""",  
            'shopee': """請分析這張產品圖片，提供以下資訊（用繁體中文回答）：
1. 產品類別（一個詞或短語）
2. 產品描述（2-3句話）
3. 上架建議（3-4條，每條一句話）
4. 產品規格（5條，格式：屬性名：屬性值）  
請以JSON格式返回，格式如下：  
{  
  "category": "產品類別",  
  "description": "產品描述",  
  "suggestions": ["建議1", "建議2", "建議3"],  
  "specifications": ["規格1", "規格2", "規格3", "規格4", "規格5"]  
}"""  
        }  
          
        prompt = prompts.get(platform, prompts['amazon'])  
          
        # Call Gemini API  
        model = genai.GenerativeModel('gemini-2.5-flash')  
        response = model.generate_content([  
            image,  
            prompt  
        ])  
          
        # Parse response  
        text_response = response.text.strip()  
          
        # Extract JSON from response (might be wrapped in markdown)  
        if '```json' in text_response:  
            text_response = text_response.split('```json')[1].split('```')[0].strip()  
        elif '```' in text_response:  
            text_response = text_response.split('```')[1].split('```')[0].strip()  
          
        analysis = json.loads(text_response)  
        return jsonify(analysis)  
          
    except Exception as e:  
        return jsonify({'error': str(e)}), 500  
@app.route('/api/generate-text', methods=['POST'])  
def generate_text():  
    """Generate product text using Gemini"""  
    try:  
        data = request.json  
          
        product = data.get('product', {})  
        platform = data.get('platform', 'amazon')  
        style = data.get('style', 'minimal')  
        language = data.get('language', 'en')  
        brand_name = data.get('brandName', '')  
        extra_info = data.get('extraInfo', '')  
          
        platform_names = {  
            'amazon': 'Amazon',  
            'taobao': '淘宝',  
            'jd': '京东',  
            'shopee': '蝦皮購物'  
        }  
          
        style_names = {  
            'minimal': '极简',  
            'cyber': '赛博',  
            'chinese': '国潮'  
        }  
          
        is_chinese = language.startswith('zh')  
        brand_line = f"品牌名：{brand_name}\n" if brand_name and is_chinese else (f"Brand Name: {brand_name}\n" if brand_name else "")  
        extra_info_line = f"补充信息：{extra_info.strip()}\n" if extra_info and extra_info.strip() and is_chinese else (f"Additional Info: {extra_info.strip()}\n" if extra_info and extra_info.strip() else "")  
          
        if is_chinese:  
            prompt = f"""基于以下产品信息，生成{platform_names.get(platform, 'Amazon')}平台的商品文案（{style_names.get(style, '极简')}风格）：  
{brand_line}{extra_info_line}产品类别：{product.get('category', '')}  
产品描述：{product.get('analysis', {}).get('description', '')}  
产品规格：{', '.join(product.get('analysis', {}).get('specifications', []))}  
请生成：
1. 商品标题（吸引人，包含关键词）
2. 商品描述（详细，突出卖点，适合{platform_names.get(platform, 'Amazon')}平台）
3. 商品规格列表（5条）  
以JSON格式返回：  
{{  
  "title": "商品标题",  
  "description": "商品描述",  
  "specifications": ["规格1", "规格2", "规格3", "规格4", "规格5"]  
}}"""  
        else:  
            prompt = f"""Generate product copy for {platform_names.get(platform, 'Amazon')} platform ({style_names.get(style, 'minimal')} style) based on:  
{brand_line}{extra_info_line}Category: {product.get('category', '')}  
Description: {product.get('analysis', {}).get('description', '')}  
Specifications: {', '.join(product.get('analysis', {}).get('specifications', []))}  
Generate:
1. Product title (attractive, includes keywords)
2. Product description (detailed, highlights selling points, suitable for {platform_names.get(platform, 'Amazon')})
3. Specification list (5 items)  
Return in JSON format:  
{{  
  "title": "Product Title",  
  "description": "Product Description",  
  "specifications": ["Spec1", "Spec2", "Spec3", "Spec4", "Spec5"]  
}}"""  
          
        # Call Gemini API  
        model = genai.GenerativeModel('gemini-2.5-flash')  
        response = model.generate_content(prompt)  
          
        # Parse response  
        text_response = response.text.strip()  
          
        if '```json' in text_response:  
            text_response = text_response.split('```json')[1].split('```')[0].strip()  
        elif '```' in text_response:  
            text_response = text_response.split('```')[1].split('```')[0].strip()  
          
        result = json.loads(text_response)  
        return jsonify(result)  
          
    except Exception as e:  
        return jsonify({'error': str(e)}), 500  
@app.route('/api/generate-image', methods=['POST'])  
def generate_image():  
    """Generate product image using Gemini"""  
    try:  
        data = request.json  
        prompt = data.get('prompt', '')  
        style = data.get('style', 'minimal')  
        platform = data.get('platform', 'amazon')  
        image_type = data.get('type', 'main')  
          
        style_prompts = {  
            'minimal': '极简风格，简洁现代，突出产品本身，干净背景',  
            'cyber': '赛博风格，科技感强，未来感，炫酷',  
            'chinese': '国潮风格，传统与现代结合，文化元素'  
        }  
          
        platform_prompts = {  
            'amazon': '适合Amazon平台，专业产品摄影风格',  
            'taobao': '适合淘宝平台，营销感强，吸引眼球',  
            'jd': '适合京东平台，高端品质展示',  
            'shopee': '适合蝦皮平台，乾淨白底，可加小促銷標，行動端優先'  
        }  
          
        full_prompt = f"{prompt}，{style_prompts.get(style, '极简风格')}，{platform_prompts.get(platform, '专业产品摄影风格')}，高质量产品图片"  
          
        # Call Gemini API  
        model = genai.GenerativeModel('gemini-2.5-flash-image')  
        response = model.generate_content(  
            full_prompt,  
            generation_config=genai.types.GenerationConfig(  
                response_mime_type="image/png"  
            )  
        )  
          
        # Convert image to base64  
        if response.data:  
            image_base64 = base64.b64encode(response.data).decode('utf-8')  
            return jsonify({  
                'image': f'data:image/png;base64,{image_base64}'  
            })  
        else:  
            return jsonify({'error': 'Failed to generate image'}), 500  
              
    except Exception as e:  
        return jsonify({'error': str(e)}), 500  
# ==================== Static Files ====================  
@app.route('/')  
def serve_index():  
    """Serve the React app"""  
    return send_from_directory(app.static_folder, 'index.html')  
@app.route('/<path:path>')  
def serve_static(path):  
    """Serve static files"""  
    if os.path.exists(os.path.join(app.static_folder, path)):  
        return send_from_directory(app.static_folder, path)  
    else:  
        # For SPA routing, return index.html  
        return send_from_directory(app.static_folder, 'index.html')  
@app.errorhandler(404)  
def not_found(e):  
    """Handle 404 by serving index.html for SPA routing"""  
    return send_from_directory(app.static_folder, 'index.html')  
if __name__ == '__main__':  
    app.run(host='0.0.0.0', port=8080, debug=False)  
