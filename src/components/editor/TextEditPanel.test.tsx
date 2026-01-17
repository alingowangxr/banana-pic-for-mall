import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { TextEditPanel } from "./TextEditPanel";

describe("TextEditPanel", () => {
  const defaultProps = {
    title: "测试标题",
    description: "测试描述",
    specifications: ["规格1", "规格2", "规格3"],
    onTitleChange: vi.fn(),
    onDescriptionChange: vi.fn(),
    onSpecChange: vi.fn(),
  };

  it("should render all card titles", () => {
    render(<TextEditPanel {...defaultProps} />);
    expect(screen.getByText("商品标题")).toBeInTheDocument();
    expect(screen.getByText("商品描述")).toBeInTheDocument();
    expect(screen.getByText("商品规格")).toBeInTheDocument();
  });

  it("should display title value in input", () => {
    render(<TextEditPanel {...defaultProps} />);
    const titleInput = screen.getByDisplayValue("测试标题");
    expect(titleInput).toBeInTheDocument();
  });

  it("should display description value in textarea", () => {
    render(<TextEditPanel {...defaultProps} />);
    const descTextarea = screen.getByDisplayValue("测试描述");
    expect(descTextarea).toBeInTheDocument();
  });

  it("should display all specification inputs", () => {
    render(<TextEditPanel {...defaultProps} />);
    expect(screen.getByDisplayValue("规格1")).toBeInTheDocument();
    expect(screen.getByDisplayValue("规格2")).toBeInTheDocument();
    expect(screen.getByDisplayValue("规格3")).toBeInTheDocument();
  });

  it("should call onTitleChange when title input changes", () => {
    const onTitleChange = vi.fn();
    render(<TextEditPanel {...defaultProps} onTitleChange={onTitleChange} />);

    const titleInput = screen.getByDisplayValue("测试标题");
    fireEvent.change(titleInput, { target: { value: "新标题" } });

    expect(onTitleChange).toHaveBeenCalledWith("新标题");
  });

  it("should call onDescriptionChange when description textarea changes", () => {
    const onDescriptionChange = vi.fn();
    render(<TextEditPanel {...defaultProps} onDescriptionChange={onDescriptionChange} />);

    const descTextarea = screen.getByDisplayValue("测试描述");
    fireEvent.change(descTextarea, { target: { value: "新描述" } });

    expect(onDescriptionChange).toHaveBeenCalledWith("新描述");
  });

  it("should call onSpecChange with correct index when spec input changes", () => {
    const onSpecChange = vi.fn();
    render(<TextEditPanel {...defaultProps} onSpecChange={onSpecChange} />);

    const specInput = screen.getByDisplayValue("规格2");
    fireEvent.change(specInput, { target: { value: "新规格2" } });

    expect(onSpecChange).toHaveBeenCalledWith(1, "新规格2");
  });

  it("should render correct number of specification inputs", () => {
    const specs = ["A", "B", "C", "D", "E"];
    render(<TextEditPanel {...defaultProps} specifications={specs} />);

    specs.forEach((spec) => {
      expect(screen.getByDisplayValue(spec)).toBeInTheDocument();
    });
  });
});
