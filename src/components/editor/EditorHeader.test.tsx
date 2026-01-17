import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EditorHeader } from "./EditorHeader";

describe("EditorHeader", () => {
  const defaultProps = {
    isMobileView: true,
    setIsMobileView: vi.fn(),
    onBack: vi.fn(),
    onExport: vi.fn(),
    isExporting: false,
  };

  it("should render header with title", () => {
    render(<EditorHeader {...defaultProps} />);
    expect(screen.getByText("编辑详情页")).toBeInTheDocument();
  });

  it("should render back button", () => {
    render(<EditorHeader {...defaultProps} />);
    expect(screen.getByText("返回")).toBeInTheDocument();
  });

  it("should call onBack when back button is clicked", () => {
    const onBack = vi.fn();
    render(<EditorHeader {...defaultProps} onBack={onBack} />);

    fireEvent.click(screen.getByText("返回"));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it("should call onExport when export button is clicked", () => {
    const onExport = vi.fn();
    render(<EditorHeader {...defaultProps} onExport={onExport} />);

    fireEvent.click(screen.getByText("导出"));
    expect(onExport).toHaveBeenCalledTimes(1);
  });

  it("should show loading state when exporting", () => {
    render(<EditorHeader {...defaultProps} isExporting={true} />);
    expect(screen.getByText("导出中...")).toBeInTheDocument();
  });

  it("should disable export button when exporting", () => {
    render(<EditorHeader {...defaultProps} isExporting={true} />);
    const exportButton = screen.getByText("导出中...").closest("button");
    expect(exportButton).toBeDisabled();
  });

  it("should render mobile and desktop view buttons", () => {
    render(<EditorHeader {...defaultProps} isMobileView={true} />);
    expect(screen.getByText("手机")).toBeInTheDocument();
    expect(screen.getByText("桌面")).toBeInTheDocument();
  });

  it("should call setIsMobileView when view buttons are clicked", () => {
    const setIsMobileView = vi.fn();
    render(<EditorHeader {...defaultProps} setIsMobileView={setIsMobileView} />);

    fireEvent.click(screen.getByText("桌面"));
    expect(setIsMobileView).toHaveBeenCalledWith(false);

    fireEvent.click(screen.getByText("手机"));
    expect(setIsMobileView).toHaveBeenCalledWith(true);
  });
});
