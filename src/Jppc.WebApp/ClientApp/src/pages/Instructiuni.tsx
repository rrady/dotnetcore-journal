import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import * as PropTypes from 'prop-types';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';

export interface Props extends WithStyles<typeof styles> {

}

class Instructiuni extends React.Component {
  public render () {
    return (
      <div>
        <Typography variant="h5" gutterBottom>Cine poate publica</Typography>
        <Typography variant="body1" gutterBottom>
        Pot trimite articole cercetatori, cadre didactice universitare si profesionisti cu preocupari legate de
        domeniul stiintelor socio-economice. Principalele criterii avute in vedere de catre referenti sunt
        originalitatea, noutatea, potentialul de a starni dezbateri si coerenta expunerii. Documentele trimise
        pentru publicare vor fi analizate de catre redactori inainte de a fi introduse in procesul de recenzare.
        </Typography>
        <Typography variant="h5" gutterBottom>Reperele articolelor</Typography>
        <Typography variant="body1" gutterBottom>
        Prospectare si analiza de nevoi pentru clienti/parteneri/beneficiari;<br/>
        Consultanta, asistenta si orientare pentru implementarea proiectelor de cercetare;<br/>
        Realizarea designului cercetarii (briefing, stabilirea obiectivelor, a metodologiei adecvate, esantionare
        elaborarea instrumentelor de cercetare si planul cercetarii);<br/>
        Aplicarea instrumentelor de cercetare si colectarea datelor:<br/>
        Analiza si interpretarea datelor statistice:<br/>
        Redactarea rapoartelor de cercetare;<br/>
        Transpunerea rezultatelor cercetarii in recomandari actionabile pentru client/partener/beneficiar;<br/>
        Prospectarea permanenta a pietei si a fenomenelor sociale pentru a putea propune studii actuale pe teme
        relevante la nivel micro si macroregional;<br/>
        Evaluare de proces, de produs, de impact;<br/>
        Diagnoza si prognoza institutionala/organizationala.</Typography>

        <Typography variant="h5" gutterBottom>Cerinte pentru publicare</Typography>

        <Typography variant="body1" gutterBottom>Articolul trebuie sa fie trimis, in limba engleza, prin e-mail,
        ca fisier atasat Word, intr-un singur document care include toate imaginile si tabelele. Cerintele minime
        care trebuiesc indeplinite privesc urmatoarele aspecte:</Typography>
        <Typography variant="body1" gutterBottom>
        Dimensiunea: articolul ar trebui sa contina maxim 15 de pagini, inclusiv bibliografie (6000 cuvinte)
        Titlul: trebuie sa fie concis si sa rezume cat mai adecvat continutul articolului.<br/>
        Format fisier: Microsoft Word.<br/>
        Format text: Times New Roman 12, spatiere la 1 rand.<br/>
        Informatii despre autor/autori (maxim 200 de cuvinte): pentru fiecare autor trebuie sa se mensioneze
        titlul academic, pozitia curenta, institutia de care apartine, date de contact - telefon si adresa de
        e-mail. Toate aceste informatii vor fi publice pentru autorii selectati. Prezentarea unui manuscris
        implica faptul ca autorul certifica ca materialul nu este protejat de copyright si nu este in prezent in
        curs de revizuire pentru alta publicatie. Daca articolul a aparut, sau va aparea, intr-o alta publicatie,
        detaliile cu privire la o astfel de publicare trebuie sa fie aduse la cunostinta editorilor, la momentul
        depunerii.<br/>
        Rezumatul (Abstract): prezinta, pe scurt, scopul, domeniul de aplicare, metodele de cercetare, rezultatele
        si concluziile articolului. Rezumatul are maxim 250 de cuvinte si este redactat in limba engleza.
        Cuvintele cheie (4-6 cuvinte cheie): au scopul de a oferi o clasificare rapida pentru articol. Cuvintele
        cheie, in limba engleza, trebuie prezentate dupa rezumat, separate prin punct si virgula (;).
        Tabelele: cat mai simple, cu titluri explicative, numerotate in ordinea in care apar in text. Sursa
        datelor trebuie mentionata sub fiecare tabel (Times New Roman 10, italic, aliniere stanga).
        Graficele: realizate in Excel, in alb-negru, trebuie inserate si numerotate in ordinea in care apar in
        text. Fiecare grafic trebuie sa aiba titlu explicativ, sursa datelor fiind mentionata sub fiecare grafic
        (Times New Roman 10, italic, aliniere stanga).<br/>
        Notele de subsol:se insereaza pe parcursul textului si se numeroteaza cu cifre arabe. Dimensiunile
        acestora ar trebui sa fie reduse prin aducerea de clarificari pe marginea textului.
        Referintele bibliografice se mentioneaza in text, astfel: numele autorului, anul de publicare si pagina,
        toate in paranteze (Ritzer and Goodman, 2003, p. 93) sau daca numele autorului este utilizat in
        propozitie: ... Ritzer and Goodman (2003, p. 93).La prima referire, cu trei-cinci autori, se dau toate
        numele, ulterior, se utilizeaza [primul autor] "et al.". In cazul in care se citeaza mai mult de un
        articol de acelasi autor, din acelasi an, se folosesc literele a, b, c, etc, care sunt trecute dupa anul
        aparitiei. Citarea unui articol disponibil online dupa aceleasi reguli de la revista sau carte cu
        specificarea adresei internet unde a fost consultata.<br/>
        Bibliografia: lista completa de referinte citate in text trebuie sa fie prezentata la sfarsitul lucrarii,
        dupa anexe, in ordinea alfabetica a numelor autorilor si in ordine cronologica pentru un grup de referinte
        ale aceluiasi autori. Ordinea este urmatoarea: nume autor/autori, an aparitie, titlu, editura, oras; de
        exemplu:<br/><br/>
        Rea, A., Tripier, M., 2008, Sociologie de l'immigration, La Decouverte, Paris
        </Typography>
        <Typography variant="h5" gutterBottom>Procesul de recenzare</Typography>
        <Typography variant="body1" gutterBottom>
        Articolele sunt recenzate de catre doi specialisti. In functie de recomandarile acestora, editorii iau
        decizia publicarii/respingerii articolului sau fac sugestii de imbunatatire autorului/autorilor. Editorii
        isi rezerva dreptul de a face schimbari de redactare minore la articolele trimise, inclusiv corectarea
        greselilor gramaticale, de punctuatie si scriere, precum si la formatul articolului, dar nu vor fi
        efectuate modificari majore fara aprobarea autorului. Daca sunt necesare modificari majore, articolul este
        inapoiat autorului pentru ca acesta sa faca modificarile necesare. Autorii sunt anunsasi, prin e-mail,
        despre starea articolelor trimise in cel mult 6 saptamani de la data primirii.</Typography>
        <Typography variant="body1" gutterBottom>
        Articolele acceptate pentru publicare sunt trimise autorilor pentru bunul de tipar. Autorii sunt rugati sa
        raspunda redactiei in cel mult 7 zile. Autorii care trimit articole catre redactie isi declara implicit
        acordul cu publicarea in aceste conditii.</Typography>

      </div>
    );
  }
}

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: 500,
  },
});

(Instructiuni as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(Instructiuni);
