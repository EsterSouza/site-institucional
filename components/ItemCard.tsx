import { BF_CUPOM, type Item } from "@/content/site";

// Com preço, o botão é de compra (laranja). Sem preço, é para conhecer.
// Black November: as duas versões vão no HTML e o CSS mostra a certa pela classe bf-on do <html>.
// Item que vai direto ao checkout ganha o cupom no link e é o bloco #bf26-oferta da faixa.
export default function ItemCard({ item }: { item: Item }) {
    const cupom =
        item.black && item.link.includes("pay.cakto.com.br")
            ? `${item.link}${item.link.includes("?") ? "&" : "?"}coupon=${BF_CUPOM}`
            : "";
    const botao = (href: string, classe = "") => (
        <a
            className={`btn ${item.preco ? "btn-compra" : "btn-linha"}${classe}`}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
        >
            {item.botao}
        </a>
    );
    return (
        <article className="cartao item" id={cupom ? "bf26-oferta" : undefined}>
            <h3>{item.nome}</h3>
            <p>{item.detalhe}</p>
            {item.preco && !item.black && <span className="item-preco">{item.preco}</span>}
            {item.black && (
                <span className="item-preco">
                    <span className="sem-bf">{item.preco}</span>
                    <span className="so-bf">
                        <span className="selo-bf">Black November · 30% OFF</span>
                        De <s>{item.preco}</s> por {item.black}
                    </span>
                </span>
            )}
            {cupom ? (
                <>
                    {botao(cupom, " so-bf")}
                    {botao(item.link, " sem-bf")}
                    <p className="so-bf nota-bf">
                        O cupom {BF_CUPOM} já vai aplicado no checkout. Se não aparecer, digite-o no campo de cupom.
                    </p>
                </>
            ) : (
                botao(item.link)
            )}
        </article>
    );
}
