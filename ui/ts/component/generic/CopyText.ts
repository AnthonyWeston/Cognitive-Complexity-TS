import { addStyleSheet, element } from "../../framework";
import { ClipboardSvg } from "../icon/Clipboard";

addStyleSheet(import.meta.url);

class HiddenCopyText {
    private readonly copyText = element("input", {
        className: "hidden-offscreen"
    });

    constructor() {
        document.body.append(this.copyText);
    }

    copy(text: string) {
        this.copyText.value = text;
        this.copyText.select();
        document.execCommand("copy");
    }

    static readonly instance = new HiddenCopyText();
}

export function CopyText(text: string): Node {
    const copyButton = element("button", {
        className: "copytext-button",
        title: "copy",
        type: "button"
    },
        ClipboardSvg()
    );

    copyButton.addEventListener("click", () => {
        HiddenCopyText.instance.copy(text);
    });

    return copyButton;
}
