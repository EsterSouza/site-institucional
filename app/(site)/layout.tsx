import Topo from "@/components/Topo";
import Rodape from "@/components/Rodape";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Topo />
            <main>{children}</main>
            <Rodape />
        </>
    );
}
