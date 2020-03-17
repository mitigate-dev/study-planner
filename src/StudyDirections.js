import React, { useState } from 'react';
import rows from './StudyDirectionsData';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function StudyDirections() {
  const [selectedDirection, setSelectedDirection] = useState(undefined);
  console.log({selectedDirection});

  return (
    <React.Fragment>
      <h2 className="Block-title">
        Studiju virzieni un ieteikumi padziļināto kursu izvēlei
      </h2>

      <ul className="Default-list">
        <li>
          Ogres 1. vidusskola piedāvās deviņus padziļinātos kursus - Latviešu valoda un literatūra II, Angļu valoda II, Sociālās zinātnes II, Fizika II, Ķīmija II, Bioloģija II, Matemātika II, Dizains un tehnoloģijas II, Programmēšana II.
        </li>
        <li>
          Skolēns nevar vienlaicīgi apgūt padziļināto kursu Dizains un tehnoloģijas II un Programmēšana II.
        </li>
        <li>
          Skolēniem tiks piedāvāts vai nu padziļinātais kurss Ķīmija II, vai arī padziļinātais kurss Bioloģija II; skolas piedāvājums atkarīgs no skolēnu intereses par šiem kursiem.
        </li>
        <li>
          Ogres 1. vidusskola piedāvās specializētos kursus - Spāņu valoda, Franču valoda, Filozofija, Uzņēmējdarbības pamati, Projektu vadība, Psiholoģija, Cilvēka bioloģija.
        </li>
      </ul>

      <Select
        autoWidth={true}
        style={{ width: '100%', marginBottom: '1rem' }}
        displayEmpty
        variant="outlined"
        value={selectedDirection || ""}
        renderValue={(row) => (row ? row.study_direction : <em>Izvēlies virzienu ...</em>)}
        onChange={(e) => setSelectedDirection(e.target.value)}
      >
        {rows.map(row => (
          <MenuItem key={row.nr} value={row}>
            {row.study_direction}
          </MenuItem>
        ))}
      </Select>

      {selectedDirection &&
        <Typography variant="body1" paragraph>
          {selectedDirection.recomendations}
        </Typography>
      }
    </React.Fragment>
  );
}

export default StudyDirections;
