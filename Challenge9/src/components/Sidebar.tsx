import { MenuNode } from "../models/MenuNode";

type Props = {
    node: MenuNode;
};

function Sidebar({ node }: Props) {
    return (
        <ul style={{ listStyle: "none", paddingLeft: "20px" }}>
            <li>
                <a href={node.link} style={{ color: "white", textDecoration: "none" }}>
                    {node.title}
                </a>

                {node.children.length > 0 && (
                    <div style={{ marginLeft: "15px" }}>
                        {node.children.map((child, index) => (
                            <Sidebar key={index} node={child} />
                        ))}
                    </div>
                )}
            </li>
        </ul>
    );
}

export default Sidebar;