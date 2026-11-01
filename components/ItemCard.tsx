import type { Item } from "@/content/site";

// Com preço, o botão é de compra (laranja). Sem preço, é para conhecer.
export default function ItemCard({ item }: { item: Item }) {
    return (
        <article className="cartao item">
            <h3>{item.nome}</h3>
            <p>{item.detalhe}</p>
            {item.preco && <span className="item-preco">{item.preco}</span>}
            <a
                className={`btn ${item.preco ? "btn-compra" : "btn-linha"}`}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
            >
                {item.botao}
            </a>
        </article>
    );
}
