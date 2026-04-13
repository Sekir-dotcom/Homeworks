import { MenuNode } from "../models/MenuNode";

const root = new MenuNode("Menú", "/", "Root");

const products = new MenuNode("Productos", "/products", "Products");
const clothing = new MenuNode("Ropa", "/products/clothing", "Clothing");
const shoes = new MenuNode("Zapatos", "/products/shoes", "Shoes");

const settings = new MenuNode("Configuración", "/settings", "Settings");
const profile = new MenuNode("Perfil", "/settings/profile", "Profile");
const security = new MenuNode("Seguridad", "/settings/security", "Security");

products.addChild(clothing);
products.addChild(shoes);

settings.addChild(profile);
settings.addChild(security);

root.addChild(products);
root.addChild(settings);

export default root;