import { addStyleSheet, element } from "../../framework";

addStyleSheet("/css/component/generic/ToggleButton");

export class ToggleButton {
    readonly dom: HTMLInputElement;

    private onStateChange: (isOpen: boolean) => void;

    constructor(isOpen: boolean, onStateChange: (isOpen: boolean) => void) {
        this.onStateChange = onStateChange;

        this.dom = element("input", {
            checked: isOpen,
            className: "togglebutton",
            type: "checkbox",
        });

        this.dom.addEventListener("change", () => this.handleStateChange());

        this.setSymbol();
    }

    private handleStateChange() {
        this.setSymbol();
        this.onStateChange(this.dom.checked);
    }

    setState(open: boolean) {
        this.dom.checked = open;
        this.handleStateChange();
    }

    private setSymbol() {
        if (this.dom.checked) {
            this.dom.innerHTML = "-";
        } else {
            this.dom.innerHTML = "+";
        }
    }
}
