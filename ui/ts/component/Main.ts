import { ProgramOutput } from "../../../shared/types";
import { ComplexityController, Include } from "../complexity-tree/ComplexityController.js";
import { Tree } from "./tree/Tree.js";
import { element } from "../framework.js";
import { GlobalControl } from "./controls/GlobalControl.js";
import { GlobalToggleControl } from "./controls/GlobalToggleControl.js";
import { ComplexityModel } from "../complexity-tree/ComplexityModel.js";

export function Main(complexity: ProgramOutput) {
    const view = new Tree();
    const model = new ComplexityModel(view);
    const controller = new ComplexityController(complexity, model, view);

    const sortInOrder = new GlobalToggleControl(true, "Sort A-Z & By Line", (state) => {
        if (state) {
            controller.sortInOrder();
        }

        sortByComplexity.setState(!state);
    });

    const sortByComplexity = new GlobalToggleControl(false, "Sort By Complexity", (state) => {
        if (state) {
            controller.sortByComplexity();
        }

        sortInOrder.setState(!state);
    });

    function updateFilter() {
        if (includeFolders.getState()) {
            controller.setInclude(Include.folders);
        } else if (includeFiles.getState()) {
            controller.setInclude(Include.files);
        } else {
            controller.setInclude(Include.containers);
        }
    }

    const includeFolders = new GlobalToggleControl(true, "Include Folders", (state) => {
        // folders implies files
        if (state) {
            includeFiles.setState(true);
        }

        updateFilter();
    });

    const includeFiles = new GlobalToggleControl(true, "Include Files", (state) => {
        // no files implies no folders
        if (!state) {
            includeFolders.setState(false);
        }

        updateFilter();
    });

    return element("main", {},
        GlobalControl("Expand All", () => {
            controller.expandAll();
        }),
        GlobalControl("Collapse All", () => {
            controller.collapseAll();
        }),

        sortInOrder.dom,
        sortByComplexity.dom,

        includeFolders.dom,
        includeFiles.dom,

        view.dom
    );
}
