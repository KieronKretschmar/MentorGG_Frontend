<template>
  <div class="view view-contact">
    <div class="fixed-width-container">
      <h2 class="section-header">Contact</h2>
      <div class="bordered-box">
        <a href="https://discord.gg/X29FEKG" target="_blank" class="discord-hint-inline">
          <img src="@/assets/Discord-Logo-Color.svg" alt="Discord Logo" title="Join us on Discord" />
          <p>Join us on Discord!</p>
        </a>
      </div>
      <div class="bordered-box">
        <div class="language-selector">
          <button
            class="button-variant-bordered"
            :class="{active: language == 'en'}"
            @click="language = 'en'"
          >English</button>
          <button
            class="button-variant-bordered"
            :class="{active: language == 'de'}"
            @click="language = 'de'"
          >German</button>
        </div>
      </div>
      <div class="bordered-box">
        <div class="legal" v-if="language == 'en'">
          <h2>Legal Disclosure</h2>
          <h3>Information in accordance with Section 5 TMG</h3>

          <p>
            Mentor.gg UG (haftungsbeschränkt)
            <br />Moorkamp 22
            <br />20357 Hamburg
          </p>

          <h3>Register entry</h3>
          <p>
            Register Number: 157449
            <br />Register Court: AG Hamburg
          </p>

          <p>
            <strong>Represented by:</strong>
            <br />Kieron Kretschmar, Magnus L&uuml;tt
          </p>

          <h3>Contact Information</h3>
          <p>
            Telephone: (ZERO)049 1627674904
            <br />E-Mail:
            <a href="mailto:info@mentor.gg">info@mentor.gg</a>
            <br />Internet address:
            <a href="https://mentor.gg/" target="_blank">https://mentor.gg/</a>
            <br />
          </p>

          <h3>Disclaimer</h3>
          <p>
            Accountability for content
            <br />The contents of our pages have been created with the utmost care. However, we cannot guarantee the contents'
            accuracy, completeness or topicality. According to statutory provisions, we are furthermore responsible for
            our own content on these web pages. In this matter, please note that we are not obliged to monitor
            the transmitted or saved information of third parties, or investigate circumstances pointing to illegal activity.
            Our obligations to remove or block the use of information under generally applicable laws remain unaffected by this as per
            §§ 8 to 10 of the Telemedia Act (TMG).
            <br />
            <br />Accountability for links
            <br />Responsibility for the content of
            external links (to web pages of third parties) lies solely with the operators of the linked pages. No violations were
            evident to us at the time of linking. Should any legal infringement become known to us, we will remove the respective
            link immediately.
            <br />
            <br />Copyright
            <br />Our web pages and their contents are subject to German copyright law. Unless
            expressly permitted by law, every form of utilizing, reproducing or processing
            works subject to copyright protection on our web pages requires the prior consent of the respective owner of the rights.
            Individual reproductions of a work are only allowed for private use.
            The materials from these pages are copyrighted and any unauthorized use may violate copyright laws.
            <br />
            <br />
          </p>

          <p>MENTOR.GG is not associated or affiliated with Valve Corporation in any way.</p>
        </div>

        <div class="legal" v-if="language == 'de'">
          <h2>Impressum</h2>

          <h3>Angaben gem&auml;&szlig; &sect; 5 TMG</h3>
          <p>
            Mentor.gg UG (haftungsbeschr&auml;nkt)
            <br />Moorkamp 22
            <br />20357 Hamburg
          </p>

          <p>
            Handelsregister: 157449
            <br />Registergericht: AG Hamburg
          </p>

          <p>
            <strong>Vertreten durch:</strong>
            <br />Kieron Kretschmar, Magnus L&uuml;tt
          </p>

          <h3>Kontakt</h3>
          <p>
            Telefon: (NULL) 1627674904
            <br />E-Mail:
            <a href="mailto:info@mentor.gg">info@mentor.gg</a>
            <br />Internet address:
            <a href="https://mentor.gg/" target="_blank">https://mentor.gg/</a>
            <br />
          </p>

          <h3>Streitschlichtung</h3>
          <p>
            Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
            <a
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >https://ec.europa.eu/consumers/odr</a>.
            <br />Unsere E-Mail-Adresse finden Sie oben im Impressum.
          </p>

          <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>

          <h3>Haftung f&uuml;r Inhalte</h3>
          <p>
            Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs.1 TMG f&uuml;r eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unber&uuml;hrt. Eine diesbez&uuml;gliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung m&ouml;glich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
          </p>
          <h3>Haftung f&uuml;r Links</h3>
          <p>
            Unser Angebot enth&auml;lt Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen. F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf m&ouml;gliche Rechtsverst&ouml;&szlig;e &uuml;berpr&uuml;ft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
            Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
          </p>
          <h3>Urheberrecht</h3>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den privaten, nicht kommerziellen Gebrauch gestattet.
            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
          </p>
          <br />
          <p>MENTOR.GG ist in keinster Art und Weise mit Valve Corporation assoziiert oder verbunden.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      language: "en"
    };
  }
};
</script>

<style lang="scss">
.view-contact {
  margin-top: 70px;

  .language-selector {
    display: flex;
    justify-content: space-between;

    button {
      width: calc(50% - 10px);
    }
  }

  .bordered-box {
    color: white;
    margin-bottom: 20px;

    a {
      color: $orange;
    }

    p {
      color: white;
      font-weight: 300;
    }
  }
}
.discord-hint-inline {
  height: 54px;
  // width: 130px;
  display: flex;
  // justify-content: space-between;
  justify-content: center;
  align-items: center;
  background: $dark-1;
  color: white;
  padding: 10px;
  border: 1px solid $dark-1;
  transition: 0.35s;
  text-decoration: none;
  border-radius: 4px;
  p {
    color: white;
  }
  img {
    width: 40px;
    margin-right: 8px;
  }

  &:hover {
    background: $dark-2;
  }
}
</style>