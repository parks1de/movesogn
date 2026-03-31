import type { Metadata } from 'next';
import styles from './page.module.css';

export const metadata: Metadata = {
  title: 'Personvernerklæring',
  description: 'Personvernerklæring for MOVE Sogn AS — informasjon om korleis me handterer personopplysningar.',
};

export default function PersonvernPage() {
  return (
    <main className={styles.page}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.header}>
          <span className="label">Juridisk</span>
          <h1>Personvernerklæring</h1>
          <p className={styles.meta}>MOVE Sogn AS · movesogn.no</p>
        </div>

        <article className={styles.prose}>
          <p>
            Hos MOVE Sogn, tilgjengeleg frå movesogn.no, er personvernet til våre besøkande
            ei av hovudprioriteringane våre. Denne personvernerklæringa inneheld informasjon
            om kva typar opplysningar som vert samla inn og registrerte av MOVE Sogn, og
            korleis me brukar dei.
          </p>
          <p>
            Dersom du har spørsmål eller treng meir informasjon om personvernreglane våre,
            er du velkomen til å kontakte oss.
          </p>
          <p>
            Denne personvernerklæringa gjeld berre for aktivitetane våre på nett og er
            gyldig for besøkande på nettstaden vår med omsyn til informasjon dei deler
            og/eller samlar inn på MOVE Sogn. Retningslinjene gjeld ikkje for informasjon
            som vert samla inn utanfor nettet eller via andre kanalar.
          </p>

          <h2>Samtykke</h2>
          <p>
            Ved å bruke nettstaden vår samtykkjer du til personvernerklæringa vår og godtek
            vilkåra.
          </p>

          <h2>Informasjon me samlar inn</h2>
          <p>
            Kva personopplysningar du vert beden om å gi, og grunnen til at du vert beden
            om å gi dei, vil verte gjort klart for deg på det tidspunktet me ber deg om det.
          </p>
          <p>
            Dersom du kontaktar oss direkte, kan me motta tilleggsinformasjon om deg, som
            namn, e-postadresse, telefonnummer, innhald i meldinga og/eller vedlegg du sender
            oss, og all anna informasjon du vel å gi.
          </p>
          <p>
            Når du registrerer deg for ein konto, kan me be om kontaktinformasjonen din,
            mellom anna namn, firmanamn, adresse, e-postadresse og telefonnummer.
          </p>

          <h2>Korleis me brukar informasjonen din</h2>
          <p>Me brukar informasjonen me samlar inn til ulike føremål, mellom anna for å:</p>
          <ul>
            <li>Tilby, drifte og vedlikehalde nettstaden vår</li>
            <li>Forbetre, tilpasse og utvide nettstaden vår</li>
            <li>Forstå og analysere korleis du brukar nettstaden vår</li>
            <li>Utvikle nye produkt, tenester, funksjonar og funksjonalitet</li>
            <li>Kommunisere med deg — mellom anna for kundeservice og marknadsføring</li>
            <li>Sende deg e-postar</li>
            <li>Finne og hindre svindel</li>
          </ul>

          <h2>Loggfiler</h2>
          <p>
            MOVE Sogn følgjer standard prosedyre for bruk av loggfiler. Desse filene
            registrerer besøkande når dei vitjar nettstaden. Informasjonen som vert samla
            inn av loggfiler inkluderer IP-adresser, nettlesartype, internettleverandør,
            dato- og tidsstempel, tilvisings-/utgangssider og moglegvis tal på klikk.
            Desse er ikkje knytte til personleg identifiserbar informasjon. Føremålet er
            å analysere trendar, administrere nettstaden og samle inn demografisk informasjon.
          </p>

          <h2>Informasjonskapslar og Web Beacons</h2>
          <p>
            Som alle andre nettstader brukar MOVE Sogn informasjonskapslar (cookies). Desse
            vert brukte til å lagre informasjon, mellom anna besøksval og sidene du vitjar.
            Informasjonen vert nytta til å optimalisere brukaropplevinga ved å tilpasse
            innhaldet på nettstaden.
          </p>

          <h2>Google Analytics</h2>
          <p>
            Me nyttar Google Analytics til å forstå korleis du brukar nettstaden, slik at
            me kan halde fram med å produsere engasjerande innhald. Desse informasjonskapslane
            kan mellom anna spore tid på sida og sidene du vitjar. For meir informasjon, sjå
            Google Analytics sin offisielle nettstad.
          </p>

          <h2>Rettar for California-forbrukarar (CCPA)</h2>
          <p>
            Under CCPA har California-forbrukarar, mellom anna, rett til å be om at ei
            verksemd som samlar inn personopplysningar om forbrukaren utleverer dei
            kategoriane og dei spesifikke opplysningane ei verksemd har samla inn om dei.
          </p>

          <h2>Personvernrettar etter GDPR</h2>
          <p>
            Me ønskjer å sikre at du er fullt ut klar over alle rettar du har til personvern.
            Kvar brukar har rett til:
          </p>
          <ul>
            <li><strong>Rett til innsyn</strong> — Du kan be om kopiar av personopplysningane dine.</li>
            <li><strong>Rett til retting</strong> — Du kan be om at me rettar opplysningar du meiner er unøyaktige.</li>
            <li><strong>Rett til sletting</strong> — Du kan under visse omstende be om at me slettar personopplysningane dine.</li>
            <li><strong>Rett til å avgrense handsaming</strong> — Du kan under visse omstende be om at me avgrensar handsaminga av personopplysningane dine.</li>
            <li><strong>Rett til å protestere mot handsaming</strong> — Du kan under visse omstende protestere mot handsaminga av personopplysningane dine.</li>
            <li><strong>Rett til dataportabilitet</strong> — Du kan under visse omstende be om at me overfører data til ein annan organisasjon, eller direkte til deg.</li>
          </ul>
          <p>
            Dersom du fremjar ein førespurnad, har me éin månad på oss til å svare deg.
            Ta kontakt med oss på <a href="mailto:post@movesogn.no">post@movesogn.no</a> dersom
            du ønskjer å bruke nokon av desse rettane.
          </p>

          <h2>Barns opplysningar</h2>
          <p>
            Ein annan del av prioriteringane våre er å verne barn ved bruk av internett.
            Me oppfordrar foreldre og verjer til å observere, delta i og/eller overvake og
            rettleie nettaktivitetane deira. MOVE Sogn samlar ikkje medvite inn personleg
            identifiserbar informasjon frå barn under 13 år.
          </p>

          <h2>Kontakt</h2>
          <p>
            Dersom du har spørsmål om personvernerklæringa vår, ta kontakt med oss:
          </p>
          <address>
            MOVE Sogn AS<br />
            Skarpeteigvegen 1, 6854 Kaupanger<br />
            <a href="tel:+4757676666">57 67 66 66</a><br />
            <a href="mailto:post@movesogn.no">post@movesogn.no</a>
          </address>
        </article>
      </div>
    </main>
  );
}
