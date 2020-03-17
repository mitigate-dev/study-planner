import React from 'react';
import Typography from '@material-ui/core/Typography';
import './App.css';

function IntroText() {
  return (
    <React.Fragment>
      <Typography variant="body1" paragraph>
        Katram vidusskolēnam 12. klasē jāapgūst <b>trīs padziļinātie kursi</b>. Padziļinātos kursus skolēns izvēlas, iestājoties vidusskolā. Skolēnam ne vienmēr būs dota iespēja mainīt padziļinātos kursus mācību laikā, tādēļ lēmumiem par padziļināto kursu izvēli jābūt atbildīgiem.
      </Typography>
      <Typography variant="body1" paragraph>
        Svarīgi zināt, ka <b>divos no apgūtajiem</b> padziļinātajiem kursiem skolēnam būs jākārto valsts pārbaudes darbs. Skolēns pats izvēlas, kuros no apgūtajiem padziļinātajiem kursiem kārtot valsts pārbaudes darbus. Valsts pārbaudes darba rezultāti būs nozīmīgi, iestājoties izvēlētajās studiju programmās Latvijā un ārzemēs.
      </Typography>
      <Typography variant="body1" paragraph>
        Ogres 1. vidusskola piedāvās deviņus padziļinātos kursus - Latviešu valoda un literatūra II, Angļu valoda II, Sociālās zinātnes II, Fizika II, Ķīmija II, Bioloģija II, Matemātika II, Dizains un tehnoloģijas II, Programmēšana II.      
      </Typography>
      <Typography variant="body1" paragraph>
        Lai padziļinātos kursus varētu izvēlēties pārdomāti, esam norādījuši, kurus padziļinātos kursus ieteicams izvēlēties sekmīgām studijām dažādos studiju virzienos. Aicinām iedvesmoties no piemēriem! <b>Aicinām izvēlēties un sakārtot prioritātā secībā piecus interesantākos un nākotnei noderīgākos padziļinātos kursus, kurus vēlaties mācīties!</b>
      </Typography>
      <Typography variant="body1" paragraph>
        Līdztekus padziļinātajiem kursiem skolēnam ir iespēja izvēlēties <b>specializētos kursus</b>. Specializēto kursu izvēle un apguve ir brīvprātīga! Ogres 1. vidusskola piedāvās septiņus specializētos kursus - Spāņu valoda, Franču valoda, Filozofija, Uzņēmējdarbības pamati, Projektu vadība, Psiholoģija, Cilvēka bioloģija.  
      </Typography>
    </React.Fragment>
  );
}

export default IntroText;
