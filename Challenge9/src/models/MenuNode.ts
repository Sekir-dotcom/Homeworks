export class MenuNode {
    title: string;
    link: string;
    component: string;
    children: MenuNode[];

    constructor(title: string, link: string, component: string) {
        this.title = title;
        this.link = link;
        this.component = component;
        this.children = [];
    }

    addChild(child: MenuNode): void {
        this.children.push(child);
    }
}