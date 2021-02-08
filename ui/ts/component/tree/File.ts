import { FileOutput } from "../../../../shared/types.js";
import { Container } from "./Container.js";
import { StickyTitle } from "../text/StickyTitle.js";
import { ToggleableBox } from "../box/ToggleableBox.js";
import { Score } from "../text/Score.js";
import { CopyText } from "../controls/CopyText.js";
import { concatFilePath } from "../../domain/path.js";
import { Tree } from "../../controller/TreeController.js";

export class File implements Tree {
    private box: ToggleableBox;
    private children: Container[]; // TODO allow this to change

    constructor(
        path: string,
        name: string,
        complexity: FileOutput,
        startOpen: boolean,
        children: Container[],
    ) {
        this.children = children;

        const fullPath = concatFilePath(path, name);

        this.box = new ToggleableBox([
            StickyTitle([
                name,
                CopyText(fullPath),
            ]),
            Score(complexity.score),
        ],
            startOpen,
        );

        this.box.changeHideableContent(() => this.children.map(child => child.dom));
    }

    get dom(): Node {
        return this.box.dom;
    }

    setOpenness(open: boolean) {
        this.box.setOpenness(open);
    }
}
