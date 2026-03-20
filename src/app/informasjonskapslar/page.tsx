import type { Metadata } from 'next';
import styles from '../personvern/page.module.css';

export const metadata: Metadata = {
  title: 'Informasjonskapslar',
  description: 'Retningslinjer for informasjonskapslar (cookies) på movesogn.no — kva me brukar og korleis du kan kontrollere dei.',
};

export default function InformasjonskapslarPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="label">Juridisk</span>
          <h1>Retningslinjer for informasjonskapslar</h1>
          <p className={styles.meta}>MOVE Sogn AS · movesogn.no</p>
        </div>

        <article className={styles.prose}>
          <p>
            Dette er retningslinjer for informasjonskapslar for MOVE Sogn, tilgjengeleg frå
            www.movesogn.no.
          </p>

          <h2>Kva er informasjonskapslar?</h2>
          <p>
            Som vanleg praksis med nesten alle profesjonelle nettstader brukar denne sida
            informasjonskapslar — små filer som vert lasta ned til eininga di for å forbetre
            opplevinga di. Denne sida forklarer kva informasjon dei samlar inn, korleis me
            brukar han, og kvifor me av og til treng å lagre desse informasjonskapslane.
          </p>

          <h2>Korleis me brukar informasjonskapslar</h2>
          <p>
            Me brukar informasjonskapslar av ei rekkje årsaker som er skildra nedanfor.
            Det tilrådast at du let alle informasjonskapslar vere dersom du ikkje er sikker
            på om du treng dei, i tilfelle dei vert brukte til å levere ei teneste du nyttar.
          </p>

          <h2>Deaktivering av informasjonskapslar</h2>
          <p>
            Du kan hindre innstilling av informasjonskapslar ved å justere innstillingane
            i nettlesaren din. Ver merksam på at deaktivering av informasjonskapslar vil
            påverke funksjonaliteten til denne og mange andre nettstader du vitjar.
          </p>

          <h2>Informasjonskapslane me set</h2>

          <h3>Skjemarelaterte informasjonskapslar</h3>
          <p>
            Når du sender inn data via eit skjema, til dømes kontaktskjema, kan
            informasjonskapslar verte sett til å hugse detaljane dine for framtidig bruk.
          </p>

          <h3>Samtykkje til informasjonskapslar</h3>
          <p>
            For å gje deg ein god opplevelse spør me om samtykke til informasjonskapslar
            første gongen du vitjar nettstaden. Valet ditt vert lagra slik at du ikkje
            vert spurt kvar gong.
          </p>

          <h2>Tredjeparts informasjonskapslar</h2>
          <p>
            I nokre tilfelle brukar me òg informasjonskapslar frå pålitelege tredjepartar:
          </p>

          <h3>Google Analytics</h3>
          <p>
            Denne nettstaden brukar Google Analytics, ein av dei mest utbreidde og pålitelege
            analyseløysingane på nettet, for å hjelpe oss å forstå korleis du brukar sida
            og korleis me kan forbetre opplevinga di. Desse informasjonskapslane kan spore
            ting som kor lang tid du brukar på sida og kva sider du vitjar.
          </p>
          <p>
            For meir informasjon om Google Analytics-informasjonskapslar, sjå den offisielle
            Google Analytics-sida.
          </p>

          <h3>HubSpot</h3>
          <p>
            Me nyttar HubSpot for handsaming av kontaktskjema og kundeoppfølging. HubSpot
            kan sette informasjonskapslar for å hugse skjemainformasjon og spore
            skjemainnsending.
          </p>

          <h2>Kontakt</h2>
          <p>
            Dersom du har spørsmål om bruken av informasjonskapslar, ta kontakt med oss:
          </p>
          <address>
            MOVE Sogn AS<br />
            Kaupangervegen 1, 6854 Kaupanger<br />
            <a href="tel:+4757676666">57 67 66 66</a><br />
            <a href="mailto:post@movesogn.no">post@movesogn.no</a>
          </address>
        </article>
      </div>
    </main>
  );
}
