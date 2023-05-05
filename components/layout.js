import styles from "./layout.module.css";
import Head from "next/head";

export default function Layout({children, title="default title", description="default-description"}) {
    return (
        <div className={styles.container}>
            <Head>
                <link rel="icon" href="/icon.ico"/>
                <title>{title}</title>
                <meta name="description" content={description}/>
                <meta property="og:title" content={title}/>
                <meta property="og:site_name" content="Queen's University Accessible Maps"/>
                <meta property="og:description" content={description}/>
            </Head>
            <main>
                {children}
            </main>
        </div>
    );
}