function list(listes,transform){
    /*Cette fonction transform les listes avec des listes comme [[a,d],[b]] en string comme a,d#d pour qu'on puisse les retransformer en liste,
    la variable transforme détermine en quoi on transforme, donc est ce qu'on transforme une liste en une string ou l'inverse*/
    if (transform == 'text'){
        var liste  = "" 
        for (i=0;i<listes.length;i++){
            if (i!=listes.length-1){
            liste += listes[i] + "#"
            } else {
            liste += listes[i] 
            }
        }
        return liste
    } else {
      text = listes.split("#")
        for (i=0;i<text.length;i++){
            text[i] = text[i].split(",")
        }
        return text
    }
}
function propre(score){
   /*la fonction propre transform les nombres/pourcentage en nombre avec seulement 
   2 nombres maximum après la virgule, donc par exemple 66.66666 serais transformer en 66.66,
   les nombres sans virgule ne sont pas affecter et les nombres avec seuelement un
   nombre après la virgule reste avec seuelement 1 nombre après la virgule*/
   if (score!=parseInt(score)){
     if (score ==score.toFixed(1)){
       score = score.toFixed(1)
     } else {
       score = score.toFixed(2)
     }
   }
   return score
}
function espace(reponses,changer,changerPour){
    text = ""
     /*Cette fonction transforme à la possiblité d'enlever n'importe quelle lettre
     , signe, chiffres etc et de le/la remplacer par un autre chiffre/lettres signe,
     sont utilié principale est quand il y a des espaces ou des apostrophe dans les réponses,
     quand cela se passe le code ne fonctionne pas donc ce que nous avons décidé de faire
      c'est de mettre des # au lieu d'espace et des ; au lieu d'apostrophe, de sorte à ce
      que l'utilisateur voyent les espace et les apostrophe mais que la vrai valeur soit
      sans espace/apostrophe. Cette fonction est la fonction qui accomplis la transformation
    de sorte à ce que disons que la réponses soit l'église catholique, je puisse
    demander à cette fonction de transformer l'église catholique en l;église#catholique*/
    reponse = String(reponses)
        for (j=0;j<reponse.length;j++){
            if (reponse[j]==changer){
                text += changerPour
            } else {
                text += reponse.charAt(j)
            }
        }
    return text
}
function aleatoire(max){
    //Cette fonction renvoie un nombre aléatoire entre 0 et max-1
  var numbre = parseInt(Math.random()*max)
  return numbre
}
function creerexam(leTitre,titres,options,types,reponses,div,nom,id,points,images,site){
  /*Cette fonction est la fonction qui choisi un examen aléatoire et le montre à l'utilisateur*/
  /*Premièrement on doit choisi un nombre aléatoire le nombre de question qu'il y a donc options.length*/
  var examChoisi = aleatoire(options.length)
  /*Dès qu'on a choisi l'examen que l'élève doit faire ont doit mettre tout les titres, options, types de question (checkbox,radio etc) à l'examen choisi*/
  var titres = titres[examChoisi]
  var options = options[examChoisi]
  var types = types[examChoisi]
  var reponses = reponses[examChoisi]
  var images = images[examChoisi]
  /*On créer l'afficheExam qui va être ce que l'utilisateur va voir*/
  var afficheExam = document.getElementById(div);
  /*La variable exam va contenir tout ce que l'utilisateur va voir en Commencant par le titre de l'examen*/
  var exam = "<h2 class='examQuestion'>"+leTitre+"</h2>"
  /*On créer une loop for qui va itérer le nombre de titres qu'il y a, soit le nombre de question qu'il y a dans l'examen*/
  for (i=0;i<titres.length;i++){
    /*En premier le titres, les options, le type, les images sont tous prix à l'index i, donc si c'est la première question on va choisir le premier titres, les premières options etc*/
    var titre = titres[i]
    var option = options[i]
    var type = types[i]
    var image = images[i]
    /*Si il y a des images ont les rajoutes ici, pour qu'on les rajoutes il faut que la longueur de image soit d'au moins 2 soit l'url de l'image et sa taille*/
    if (image.length>=2){
      if ((image.length==2) || (isNaN(image[2])==true)){
        /*La variable imageTextCommence détermine quant t'est ce que l'image du text, si il y en a une commence, par exemple, si il y a une photo, et une taille qui est la longeur et la prochaine valeur n'est pas un nombre, donc pas une hauteur, sa veut dire que l'image du texte commence à 2*/
         var imageTextCommence = 2
         /*Si il y a plus de 3 éléments dans image sa veut dire qu'il y a aussi une image pour le texte, et elle commence à imageTextCommence et la taille est t'a imageTextCommence+1 si il y n'y a pas plus de 3 éléments donc on ajoute juste pas d'image au texte*/
         if (image.length>3){
          exam+= "<h4 class='questionPhoto' style=\"background-image:url('"+image[imageTextCommence]+"');font-size:"+image[imageTextCommence+1]+";\">"+titre+"</h4>"
        } else {
          exam+= "<h4 class='question'>"+titre+"</h4>"
        }
        /*Si l'une des conditions du if sont vrai sa veut dire qu'il n'y a pas de heigth, cela est parce que si il y a seulement 2 élément dans image il ne peut que avoir une width et une height et si le troisième élément n'est pas un nombre alors ce n'est pas une heigth*/
        exam += "<img src='"+image[0]+"' class='photo' width='"+image[1]+"'>"
      } else {
        /*Si aucune des deux conditions précédente sont vrai alors ont a aussi une hauteur, donc un url, une longeur et une hauteur donc si il y a une image pour le texte alors elle commence à l'index 3*/
         var imageTextCommence = 3
           /*Si il y a de 3 éléments dans image sa veut dire qu'il y a aussi une image pour le texte, et elle commence à imageTextCommence et la taille est t'a imageTextCommence+1 si il y n'y a pas plus de 3 éléments donc on ajoute juste pas d'image au texte*/
         if (image.length>3){
          exam+= "<h4 class='questionPhoto' style=\"background-image:url('"+image[imageTextCommence]+"');font-size:"+image[imageTextCommence+1]+";\">"+titre+"</h4>"
        } else {
          /*Si il n'y a pas d'image alors on mais juste le titre, sans image*/ 
          exam+= "<h4 class='question'>"+titre+"</h4>"
        }
                /*Si aucune des conditions du if précédente sont vrai alors on doit aussi ajouter une heigth*/ 
        exam += "<img src='"+image[0]+"' class='photo' width='"+image[1]+"' height='"+image[2]+"'>"
      }
    }
    /*On ajoute maintenant les select/radio/checkbox */ 
    if ((type =='checkbox') ||(type =='radio') ||(type =='select')){
      /*je créer un radio/select/checkbox par options possible*/ 
      for (j=0;j<option.length;j++){
        if ((type =='checkbox') ||(type =='radio')){
          if ((type =='radio') && (j==0)){
            /*je créer un div pour les radio, pour les styler*/ 
               exam+="<div class = 'contenir-radio'>"
          }
            /*Je créer le checkbox/radio, avec un attribut name de nom, une valeur de la question, et un type du type soit checkbox ou radio, je leur donne aussi une classe soit leur type, donc encore checkbox ou radio*/ 
        exam += "<input type='"+type+"' name='"+nom[i]+"' value='"+option[j]+"' id='"+option[j]+"' class = '"+type+"'>"
        if (type =='checkbox'){
             /*Si c'est une checkbox on créer un label avec une clas de checkbox-label qui va être styler dans le css */ 
          exam += "<label for='"+option[j]+"' class ='checkbox-label' >"+option[j]+"</label>"
          //On créer une nouvelle ligne a chaque options possible, pour les checkbox seulements a part la derniere.
          if (i!=option.length-1){
            exam +="<br>"
          }
        } else {
          /*Si ce n'est pas un checkbox, alors c'est un radio, donc on lui donne une classe de radio-label*/ 
        exam += "<label for='"+option[j]+"' class ='radio-label' >"+option[j]+"</label>" 
          if (j==option.length-1){
            /*Si c'est le dernier radio on doit aussi fermer le radio*/ 
              exam +="</div><br><br>"
            }
        }
        } else if (type =='select'){
            /*Si c'est un select alors il faut d'abord commencer par créer un select avec son id et une option vide*/ 
            if (j === 0){
                exam += "<div class='select'><select id='"+id[i]+"' class = 'select-box'>"+"<option></option>"
            }
            /*Le select doit avoir une valeur de j donc l'option de réponses à l'index qu'on est donc 0,1,2 etc*/ 
            exam +=" <option value='"+j+"' class = '"+type+"'>"+option[j]+"</option>"
             /*Si c'est la dernière réponse possible alors on doit fermer le select*/ 
            if (j == option.length-1){
                exam += "</select></div>"
            }
        }
      }  
      /*Si le type de question est un text alors on doit lui donner un label et le texte du label est choisi par moi et correspond a la option[0] puisque cette variable n'est pas nécessaire si le type de question est un texte j'ai décidé de l'utiliser pour déterminer quel serait le label de la question*/ 
    } else if (type =='text'){
        exam += '<div class="envellopeur"><div class="information"><input type="text" id="'+id[i]+'" name="'+nom[i]+'" class = "'+type+'" required>'
        exam +='<label for="'+id[i]+'" class="ligne-information">'+option[0]+'</label></div></div>'
  
    }
       
  }
        /*La variable réponse est une liste de se genre [[a,d],[b]] contrairement au autre liste des types, des points des noms etc, ce n'est pas qu'une liste
        , ce sont des liste dans une liste, donc ont doit la décomposé en une string que l'ordinateur peut reconstruire en liste, par exemple [[a,d],[b]], deviendra
        a,b#d et grace à une fonction que j'ai créer je peux transformer a,d#b en liste [[a,d],[b]] et la retransformer en string, en se moment on la veux en string
        parce ce que si on la laisse en listes, soit [[a,d],[b]], quand l'ordinateur va la retransformer en string il va la transformer de la sorte, a,d,b et quand
        on va utiliser .split sa se transformera en sa [a,d,b] ce qui n'est plus la même liste donc voila pourquoi je fais sa.*/ 
  reponses = list(reponses,"text")
  exam+="<br><br><button type ='button' value = 'Soumettre' class ='bouton' onclick=soumisExam('"+reponses+"','"+nom+"','"+div+"','"+id+"','"+types+"','"+points+"','"+site+"'); ><span></span><span></span><span></span><span></span>Soumettre</button>" 
  afficheExam.innerHTML = exam

}
function soumisExam(reponses,noms,div,ids,types,points,site){
   /*Je définis la variable lesBonneRep et lesMauvaiseRep,
   ils vont représenter le montant total de bonne réponses
   et de mauvaise réponses que l'utilisateur a eu*/ 
  var lesBonneRep = 0;
  var lesMauvaiseRep = 0;
  /*Je définis la variable message qui va être le message que l'utilisateur
  va voir, qui leur dit leur bonne réponses, mauvaise réponses, score pour l'examen, score
  pour tout les examens et score pour tout les test/examens*/ 
  var message = ""
  /*Je définis la variable totalPointCetExam, qui est le nombre de points
  total pour cet exame et totalPointTrouverCetExam qui est le nombre de points
  total que l'utilisateur a pour cette exam*/ 
  var totalPointCetExam = 0;
  var totalPointTrouverCetExam = 0;
    /*Je retransforme les réponses qui ont été transformé en string comme
    a,d#b en leur liste initial donc [[a,d],[b]] dans cette exemple*/ 
  reponses = list(reponses,"liste")
  /*Je fais de même pour toutes les autres variable sauf que il ne sont
  qu'une seul listes et non des liste dans une liste donc je peux juste
  utiliser .split()*/ 
  noms = noms.split(",");
  ids = ids.split(",");
  types = types.split(",")
   points = points.split(",")
     if (site=="exam2.html"){
      localStorage.setItem('examscore', 0);
      localStorage.setItem('totalexam', 0);
    }

    /*Je change créer une variable affiche2 qui sera le message que l'utilisateur va voir quand il va cliquer sur soumettre*/
  var affiche2 = document.getElementById(div);
      /*Je créer une for loop qui va itérer le nombre de réponses qu'il y a*/
    for (k=0;k<reponses.length;k++){
      /*bonneRep et mauvaiseRep sont le nombre de bonne réponses
      a eu pour une question et le nombre de mauvaise réponses 
      quelle*/
      var bonneRep = 0;
      var mauvaiseRep = 0;
      /*La variable point est égale au points à la question qu'on est, donc si points = [100,200] et on est a la question a l'index 1 donc la question vaudra 200 points */
      point = points[k]
      point = parseInt(point)
      /*On définis le type, la réponses, le noms et les id à k, donc a quelle question on est*/
      var type = types[k]
      var reponse = reponses[k]
      var nom = noms[k]
      var id = ids[k]
      /*Si le type de question est un checkbox on retrouve la question
      avec son nom, sinon on la retouve avec son id et sa valeur*/
      if ((type =="checkbox") || (type =="radio")){     
        var question = document.getElementsByName(nom);
      } else if ((type =="select") ||(type =="text")){
        var question = document.getElementById(id).value
      } 
      /*Si le type de question est un checkbox ou un radio je dois aller voir toute les radio/checkbox avec le nom pour voir si il sont cochés*/
    if ((type =="checkbox") || (type =="radio")){  
     for (i=0;i<question.length;i++){
        /*Je définis la variable essayé à zéro, elle sera celle qui vois si l'utilisateur à cliquer sur une réponses qui ne correspond à aucune des réponses*/
        var essaye = 0
        if (question[i].checked){  
          /*Le reste du code se passe seulement si l'utilisateurs à cliquer*/
          for (j=0;j<reponse.length;j++){
            /*Si l'utilisateurs à cliquer, et l'index de la réponses qu'il/elle à cliquer
            est le même que l'index des réponses ou la réponses de l'utilisateur en mot est
            la même que la réponses,on ajoute 1 à essayé et 1 à bonne réponses*/
            if ((i==reponse[j]) || (question[i].value==reponse[j])){
              essaye++
              bonneRep++
            }
          }
          /*Si l'utilisateurs à cliquer, et essaye === 0 ça veut dire que sa réponses n'est égale à aucune des bonnes réponses donc c'est un mauvaise réponses et on ajoute un à mauvaiseRep*/
          if (essaye===0){
            mauvaiseRep++
          }
        }               
    }
  } else if (type =="select"){
        /*Si le type de questions est un select,cela veut dire qu'il y a une seule bonne réponse
        et aussi que la variable réponses est égale à l'index de la réponse, par exemple si la
        bonne réponses est 7 et les options sont [8,1,7], la réponses va être égale à 2 et non
        la réponse 7 donc on peut juste vérifier si leur réponses est égales à la réponses, si 
        ça l'est alors il on une bonneRep et 0 mauvaiseRep et si ça ne l'est pas il on 0 bonneRep et 1 mauvaiseRep*/
    if (question == reponse){
        bonneRep++
    } else {
        mauvaiseRep++
    }    
  } else {
    /*Si le type de questions est un texte alors on 
    doit juste regarder si la réponses de l'utilisateur == réponses,
    si c'est le cas on leur donne 1 bonne réponses et si il n'ont
    aucune bonne réponses donc on leur donne une mauvaise réponses*/
      if ((reponse==question) || (reponse==question.toLowerCase())){
        bonneRep++
      }
      if (bonneRep==0){
       mauvaiseRep++
      }
    }
     /*on ajoute le nombre de bonne réponses au nombre de bonne réponses 
     total et on fait de même pour les mauvaise réponses*/
   lesBonneRep += bonneRep;
   lesMauvaiseRep += mauvaiseRep;
   /*Le nombre de points trouver est égale au nombre de 
   ((bonneRep-mauvaiseRep)/reponse.length)*point de sorte
   à ce qui si l'utilisateur à 2 bonne réponse sur 2 et
   une mauvaise réponse et le nombre de point est 100
   le score sera ((2-1)/2)*100 donc l'utilisateur aura 50 point
   */
    var pointTrouver = ((bonneRep-mauvaiseRep)/reponse.length)*point
  
    /*Si le nombre de pointTrouver est moins que 0 alors on le met a 0*/
    if (pointTrouver<0){
      pointTrouver = 0
    }
    /*le nombre de point pour cette question est le nombre de
    pointTrouver/point*100*/
   pourcentageExam = propre((pointTrouver/point)*100)
   /*Pour rendre le texte avec les réponses plus grammaticallement
   correcte si l'utilisateur a plus de 1 mauvaiseRep on ajoute
   un s et sinon on n'en ajoute pas, de même pour les bonneRep*/
   if (mauvaiseRep>1){
     phraseMauvaseRep = "mauvaises réponses.";
   } else {
     phraseMauvaseRep = "mauvaise réponse.";
   }
   if (bonneRep>1){
     phraseBonneRep = "bonnes réponses ";
   } else {
     phraseBonneRep = "bonnes réponse ";
   }
      message += "Pour la question "+(k+1)+ " Tu as eu " + bonneRep + " / " + reponse.length +" "+phraseBonneRep+ "et tu as eu " + mauvaiseRep +" "+ phraseMauvaseRep +"<br>Tu as recu "+pointTrouver+" points et tu as eu une note de "+pourcentageExam+"%<br>";
  /*On ajoute le nombre de point au total dans trois variable, sois les points pour l'examen
   , les points pour tout les examens et les points pour tout les test/examen, on utilise la fonction
   propre pour enlever les nombres décimal inutile*/
    totalPointExam = parseInt(localStorage.getItem('totalexam')) + point;
    totalPoint = parseInt(localStorage.getItem('total')) + point;
    totalPointCetExam += point;
    totalPointExam = propre(totalPointExam)
    totalPoint = propre(totalPoint)
    totalPointCetExam = propre(totalPointCetExam);
     /*On ajoute le nombre de pointTrouver au trois variable
     sois les point trouver pour tout les examen, les points trouver pour tout
     et les pointTrouver pour cet examen, on utilise la fonction propre
     pour enlever les nombres décimal inutile*/
    totalPointTrouverExam = parseInt(localStorage.getItem('examscore')) + pointTrouver;
    totalPointTrouver = parseInt(localStorage.getItem('score')) + pointTrouver;
    totalPointTrouverCetExam += pointTrouver
    totalPointTrouverExam = propre(totalPointTrouverExam)
    totalPointTrouver = propre(totalPointTrouver)
    totalPointTrouverCetExam = propre(totalPointTrouverCetExam)
     /*On mets les variables de tout les points pour l'examen et tout le test
     et aussi les variable pour tout le test dans le localStorage pour qu'elle
     se rappelle du score quand on change de page et aussi pour pouvoir les réutiliser
     pour la prochaine question, si il y en a une.*/
     localStorage.setItem('totalexam', totalPointExam);
     localStorage.setItem('total', totalPoint);
    localStorage.setItem('examscore', totalPointTrouverExam);
    localStorage.setItem('score', totalPointTrouver);
  }
  /*On définit les variable pour tout les pourcentage*/
  var pourcentageTotalExam = propre((totalPointTrouverExam/totalPointExam)*100)
  var pourcentageTotal = propre((totalPointTrouver/totalPoint)*100)
  var pourcentageTotalCetExam = propre((totalPointTrouverCetExam/totalPointCetExam)*100)
  /*On dit as l'utilisateur leur score pour tout l'examen, on leur
  dit leur score pour tout les examens si la page n'est pas == exam2.html
  car sinon sa veut dire que c'est leur première exam*/
   message += "Pour l'examen global tu as recu: "+lesBonneRep +" bonne réponse et "+lesMauvaiseRep+" mauvaise réponse et " +totalPointTrouverCetExam+"/"+totalPointCetExam+" points pour une moyenne de: "+pourcentageTotalCetExam+"%";
  if (site!="exam2.html"){
    message += "<br>Pour ton résultat global pour tout les examens tu as recu "+totalPointTrouverExam+"/"+totalPointExam+" points pour une moyenne de: "+pourcentageTotalExam+"%";
  }
   message += "<br>Finalement, ton score pour tout les test/examens précédents incluant celui ci est de: " +totalPointTrouver+"/"+totalPoint+ " points et ta moyenne pour tout est de "+pourcentageTotal+"%";
   /*On ajoute le bouton pour la prochaine page*/
   if (site!="index.html"){
   message += "<br><button type = 'button' value = 'Page Suivante' class ='bouton'><a href='"+site+"'><span></span><span></span><span></span><span></span>Page Suivante</a></button>"
   } else{
        message += "<br><button type = 'button' value = 'Page Suivante' class ='bouton'><a href='"+site+"'><span></span><span></span><span></span><span></span>Retourner</a></button>"
   }
   /*On affiche le messsage*/
  affiche2.innerHTML = message;
}
function fin(div){
  afficher = document.getElementById(div);
  afficher.innerHtml = "allo";
}
function creer(titres,questions,reponses,div,nom,types,id,site,points,tricher,chancePoints,images){
    //Cette fonction créer un questionnaire avec les paramètres données, comme le titres, les questions, les réponses, le type de questions, etc
      /*Pour ce faire on créer premièrement la variable chance qui est un nombre aléatoire
      entre 0-100, ce nombre va déterminer la chance que la personne a eu et ce qu'il/elle 
      va pouvoir faire, par exemple, disons qu'il/elle a obtenu 20 sur 100, ça veut dire que
      si il utilise un indice, ça marchera seulement si l'indice qu'il demander se passe 80%
      (100-20)% du temps ou plus souvent.*/
    var chance = aleatoire(100)
    var chanceChanger = 100-chancePoints[0][0]
    var pointChanger = chancePoints[1][0]
    var chanceEnseignant = 100-chancePoints[0][1]
    var chanceEleve = 100-chancePoints[0][2]
    var pointEleve = chancePoints[1][1]
    /*Je créer un variable pour tous les montants de chance que la personne a besoin pour avoir
    leur indice et créer aussi une variable pour tous les points qu'il perdront s'il ont leur indice.*/
localStorage.setItem("chanceChanger",chanceChanger)
    localStorage.setItem("changePoint",pointChanger)
    localStorage.setItem("chanceEnseignant",chanceEnseignant)
    localStorage.setItem("chanceEleve",chanceEleve)
    localStorage.setItem("pointEleve",pointEleve)
    /*Je stocke ensuite toutes les variables mentionnées précédemment grâce à la fonction localStorage
    , pour que d'autre fonction puisse les utiliser.*/
    /*Je choisis ensuite un nombre aléatoire avec un étendu qui est le nombre de questions qu'il y a,
    si il y a 2 questions ça sera soit 0 ou 1 donc la question à l'index 0 et la question à l'index 1.*/
  var questionChoisi = aleatoire(questions.length)
        
    /*Maintenant que nous savons la question choisi, toutes les autres variables comme le titre, l'image, les options de réponses etc sont détermiers par l'index de la questionChoisi*/ 
    var question = questions[questionChoisi]
      var reponse = reponses[questionChoisi]
      var type = types[questionChoisi]
      var titre = titres[questionChoisi]
      var image = images[questionChoisi]
    /*Je créer un div appeler affiche qui va contenir tout, soit le titres, la question, les indices si l'utilisateur en a droit et etc*/ 
  var affiche = document.getElementById(div);
    /*J'ajoute le l'image à tout, qui sera la variable qui va contenir tout ce que l'utilisateur va voir, soit le titre, les options de réponses, le boutons soumettre, l'image etc.*/ 
    /*l'ajout de l'image va être assez complexe car je veux pouvoirs décider si j'ajouterais une image, ou une image et un titre avec une image en arrière, je commence par vérifier si l'image à une longueur de 2 ou si l'élément à l'index 2 n'est pas un nombre si l'une de ces conditions est vrai alors j'ai seulement besoin de dire la width et la variable imageTextCommence qui définit quand est ce que la prochaine image qui sera pour le texte à une valeur de 2 car si elle existe elle sera après l'url de l'image donc après image à l'index 0, et après la width donc index 1, donc elle sera à 2*/ 
    if ((image.length==2) || (isNaN(image[2])==true)){
    var tout = "<img src='"+image[0]+"' class='photo' width='"+image[1]+"'>"
       var imageTextCommence = 2
    } else {
        /*Si aucunes des deux conditions n'est vrai ça veut dire  que l'image à une width et une height, la variable imageTextCommence détermine l'index à laquel la prochaine image va commencer, si il y à l'url de l'image, le width et le height ça veut dire que l'index de la prochaine image pour le texte, si elle existe est de 3*/ 
        var tout = "<img src='"+image[0]+"' class='photo' width='"+image[1]+"' height='"+image[2]+"'>"
       var imageTextCommence = 3
    }
    /*Si l'image à une longueur de plus de 3 alors il y a aussi une image pour le texte à ajouter, cela est fait avec la variable imageTextCommence qui détermine quand l'image du texte commence, si par exemple imageTextCommence = 2, l'url de l'image est à l'index 2 et la mesure en px, em etc est à l'index de imageTextCommence+1 */ 
    if (image.length>3){
        tout+= "<h4 class='questionPhoto' style=\"background-image:url('"+image[imageTextCommence]+"');font-size:"+image[imageTextCommence+1]+";\">"+titre+"</h4>"
    } else {
        /*Si il n'y a pas d'image alors on mais juste le titre, sans image*/ 
        tout+= "<h4 class='question'>"+titre+"</h4>"
    }
    /*Si le type de question est une checkbox, un radio ou un select, il faut y avoir un radio/select/checkbox par réponse possible*/ 
  if ((type =='checkbox') ||(type =='radio') ||(type =='select')){
      /*je créer un radio/select/checkbox par réponse possible*/ 
    for (i=0;i<question.length;i++){
      /*Parce ce que les espaces et les apostrophe cause un problème
      j'ai créé une fonction appelée espace qui enlèves les hashtag et
      point-virgules et les remplaces par des espaces et des apostrophe,
      aucune des réponse possible ne contiennent des espaces ou des apostrophes,
      je mets des hashtag pour des espaces et des points virgules pour des
      apostrophes, la variable montreQuestion transforme les # et les ; en
      leur valeur respective pour que l'utilisateur voit un espace ou une apostrophe,
      mais que la vrai valeur de l'option choisi soit celle avec des # et des ;
      et de même pour la réponses*/ 
      var montreQuestion = espace(question[i],'#'," ");
       montreQuestion = espace(montreQuestion,';',"'");
      if ((type =='checkbox') ||(type =='radio')){
        if ((type =='radio') && (i==0)){
          /*je créer un div pour les radio, pour les styler*/ 
             tout+="<div class = 'contenir-radio'>"
        }
          /*Je créer le checkbox/radio, avec un attribut name de nom, une valeur de la question,
          et un type du type soit checkbox ou radio, je leur donne aussi une classe soit leur type,
          donc encore checkbox ou radio*/ 
      tout += "<input type='"+type+"' name='"+nom+"' value='"+question[i]+"' id='"+question[i]+"' class = '"+type+"'>"
      if (type =='checkbox'){
        tout+= "<label for='"+question[i]+"' class ='checkbox-label' >"+montreQuestion+"</label>"
        //On créer une nouvelle ligne a chaque 2 options possible, pour les checkbox seulements.
        if (i%2!==0){
          tout+="<br>"
        }
      } else {
        /*Je créer un label avec une class de radio-label si le type
        de question est un radio pour pouvoir les styler dans css*/ 
        tout+= "<label for='"+question[i]+"' class ='radio-label' >"+montreQuestion+"</label>" 
        /*Si c'est la dernière option alors on doit fermer le div */ 
        if (i==question.length-1){
            tout+="</div>"
          }
      }
      } else if ((type =='select')){
          /*Si c'est un select alors il faut d'abord commencer par créer un select avec son id et une option vide*/ 
          if (i === 0){
              tout += "<div class='select'><select id='"+id+"' class = 'select-box'>"+"<option></option>"
          }
          /*Le select doit avoir une valeur de question[i] donc l'option de réponses*/ 
          tout+=" <option value='"+question[i]+"' class = '"+type+"'>"+montreQuestion+"</option>"
           /*Si c'est la dernière réponse possible alors on doit fermer le select*/ 
          if (i == question.length-1){
              tout += "</select></div>"
          }
      }
  }
      /*Si le type de question est un text alors on doit lui donner un label et le
      texte du label est choisi par moi et correspond a la question[0] puisque cette 
      variable n'est pas nécessaire si le type de question est un texte j'ai décidé 
      de l'utiliser pour déterminer quel serait le label de la question*/ 
  } else if (type =='text'){
      tout += '<div class="envellopeur"><div class="information"><input type="text" id="'+id+'" name="'+nom+'" class = "'+type+'" required>'
      tout +='<label for="'+id+'" class="ligne-information">'+question[0]+'</label></div></div>'

  }
    /*La variable toutEleve est égale à tout les images/titres/question/réponses
    etc que je viens de créer, sauf le bouton soumis car le boutons soumis prend 
    aussi un autre paramètre qui est le nombre de points que l'utilisateur à perdu,
    il est à zéro si l'utilisateur n'utilise aucun indice et à une variable,
    soit point Changer, si l'utilisateur change de questions et à pointEleve 
    si l'utilisateur demande à un élève*/ 
    var toutEleve = tout
    /*Je créer un bouton qui accomplis la fonction soumis quand il est cliqué
    et cette fonction regarde à la réponse et dit à l'utilisateur si il/elle 
    à la bonne réponse*/ 
   tout+="<br><button type ='button' value = 'Soumettre' class ='bouton' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"','"+points+"',0,'"+image+"');><span></span><span></span><span></span><span></span>Soumettre</button>"
    var toutnon = tout
    var toutEnseignant = tout
    if (tricher==true){
        /*Je créer un bouton indice seulement si l'utilisateur à le droit a des indices/trichers*/ 
        tout += "<br><button type = 'button' value = 'Indice' class ='bouton' onclick=indice('"+div+"'); ><span></span><span></span><span></span><span></span>Indice</button>"
        tout += "<p class ='texte' display ='inline'>Appui sur indice pour voir tout les indices possibles que tu peux avoir, et ensuite descent en bas avec la barre de défilement pour les voirs</p>"
    }
    /*toutReponse sera toute une variables qui va stocker toute les réponses 
    pour les données si la personnes utilise un indice et est chanceuse*/ 
    var toutReponse = ""
    if (type=='text'){
      var conjonction = "ou"
    } else {
      var conjonction = "et"
    }
    /*La for loop qui donne toute les réponses va itérer pour le nombre de réponses qu'il y a, donc si il y a 2 réponses sa va itérer 2 fois*/ 
    for (i=0;i<reponse.length;i++){
        /*La variable laReponse est la réponses avec # transformer en espace et les points virgule transformer en apostrophe pour que l'utilisateur voit la vrai réponse et non par exemple La#Russie si la réponse est La Russie*/
        var laReponse = espace(reponse[i],'#'," ");
             laReponse = espace(laReponse,';',"'");
        if ((reponse.length!=1) && (i==0)){
            /*Si il y a plus d'une réponse on doit commencer par les bonnes réponses, dire la première réponses et ensuite et*/
            
        if (i==reponse.length-2){
            toutReponse += "Les bonnes réponses sont: "+laReponse+" "+conjonction+" "
          } else {
            toutReponse += "Les bonnes réponses sont: "+laReponse+" , "
          }
        } else if ((reponse.length!=1) && (i!=reponse.length-1)){
            /*Si il y a plus d'une bonne réponses et qu'on n'est pas à la dernière réponses on doit dire la réponses et ensuite et*/
          if (i==reponse.length-2){
            toutReponse += laReponse+" "+conjonction+" "
          } else {
            toutReponse += laReponse+" , "
          }
        } else if (reponse.length!=1){
            /*Se else if se passe seulement si il y a plus d'une réponses, et si le else if se passe ca veut dire que c'est la dernière réponse donc pas besoin de dire et*/
            toutReponse += laReponse
        } else {
            /*Se si se passe seulement si il y a une seul bonne réponse et si c'est le cas on doit juste dire, la bonne réponses est + la réponses*/
            toutReponse += "La bonnes réponse est "+ laReponse
        }

    }
    /*Si la chance que l'utilisateur puisse demander à leur enseignant définis par moi au début est 100-la chance définis par moi donc disons, 100-20 soit 80, si cette chance est plus petit que la chance choisis aléatoirement au début donc disons 81, si c'est le cas on montrera toutes les réponses, sinon, on montre quelque chose d'autre*/
    if (chanceEnseignant<chance){
            toutEnseignant += "<br><p class='texte'>"+toutReponse+"</p>"
    } else {
        /*L'autre message choisi est un nombre entre 0-3, excluant 3, donc 0-2, si le nombre est 0 j'envoie un message que l'enseignant ne va pas répondres à ta question, si c'est 1 j'envoie un autre message, si c'est 2 j'envoie un autre message cela rends le message plus aléatoire et moins statique*/
        aucuneChanceEnseignant = aleatoire(3)
        if (aucuneChanceEnseignant==0){
            aucuneChanceEnseignant = "<br><p class='texte'>Tu le saurais si tu avais étudié</p>"
        } else if (aucuneChanceEnseignant==1){
            aucuneChanceEnseignant = "<br><p class='texte'>Je ne peux pas de dire la/les réponse/s</p>"
        } else {
            aucuneChanceEnseignant = "<br><p class='texte'>C'est un test, je ne peux pas répondre à cette question pour toi</p>"
        }
        toutEnseignant += aucuneChanceEnseignant
    }
    /*On a ici un code très similaire au code pour demander à l'enseignant, mais pour demande à l'élève il faut d'abord créer le bouton soumis, la raison pour sa est que l'un des paramètres pour soumettre est le nombre de point retirer, si l'élève te répond on t'enlève des points, sinon on ne t'enlève pas de points, c'est pour cela qu'on doit créer un bouton soumis.*/
    if(chanceEleve<chance){
        toutEleve += "<br><button type ='button' value = 'Soumettre' class ='bouton' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"','"+points+"','"+pointEleve+"','"+image+"');><span></span><span></span><span></span><span></span>Soumettre</button>"
        toutReponse +=" mais tu m'en dois une"
        toutEleve += "<br>"+toutReponse
    } else {
        toutEleve += "<br><button type ='button' value = 'Soumettre' class ='bouton' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"','"+points+"',0,'"+image+"');><span></span><span></span><span></span><span></span>Soumettre</button>"
        /*Pour la création du messages de réjection quand tu demande à l'élève c'est très similaire à celui de l'enseignant, la seul différences étant le message*/
        aucuneChanceEleve = aleatoire(3)
        if (aucuneChanceEleve==0){
                aucuneChanceEleve = "<br>Pourquoi je te dirais la réponses, tu ne m'a jamais aider"
        } else if (aucuneChanceEleve==1){
                aucuneChanceEleve = "<br>Si je te dis la bonne réponse, il se peut que nous recevons tous deux un zéro"
        } else {
                aucuneChanceEleve = "<br>Je ne sais pas la réponse à la question, désolé"
        }
            toutEleve += aucuneChanceEleve
    }
    /*Je stock ensuite ces deux variables, qui contiennent tous les titres/options de questions/images etc. grâce à LocalStorage, il auronts soit les bonnes réponses soit un message de rejection dépendamment de leur chance*/
    localStorage.setItem("toutEleve",toutEleve)
    localStorage.setItem("toutEnseignant",toutEnseignant)
    /*Ensuite je créer une deuxième question de la même façon que j'ai créer la première question, mais cette fois si ça doit être une question différentes, donc ça peut seulement se passer si il y a plus d'une question évidemment*/
    if (questions.length>1){
      var questionChoisi2 = aleatoire(questions.length)
      while (questionChoisi==questionChoisi2){
        questionChoisi2 = aleatoire(questions.length)
      }
      var question2 = questions[questionChoisi2]
      var reponse2 = reponses[questionChoisi2]
      var type2 = types[questionChoisi2]
      var titre2 = titres[questionChoisi2]
      var image2 = images[questionChoisi2]
      /*J'ajoute le l'image à tout, qui sera la variable qui va contenir tout ce que l'utilisateur va voir, soit le titre, les options de réponses, le boutons soumettre, l'image etc.*/ 
      /*l'ajout de l'image va être assez complexe car Je veux pouvoirs décider si j'ajouterais une image, ou une image et un titre avec une image en arrière, je commence par vérifier si l'image à une longueur de 2 ou si l'élément à l'index 2 n'est pas un nombre si l'une de ces conditions est vrai alors j'ai seulement besoin de dire la width et la variable imageTextCommence qui définit quand est ce que la prochaine image qui sera pour le texte à un valeur de 2 car si elle existe elle sera après l'url de l'image donc 0, et après la width donc 1, donc elle sera à 2*/ 
      if ((image2.length==2) || (isNaN(image2[2])==true)){
      var tout2 = "<img src='"+image2[0]+"' class='photo' width='"+image2[1]+"'>"
       var imageTextCommence2 = 2
        } else {
          /*Si aucunes des deux conditions n'est vrai ça veut dire  que l'image à une width et une height, la variable imageTextCommence détermine l'index à laquel la prochaine image va commencer, si il y à l'url de l'image, le width et le height ça veut dire que l'index de la prochaine image pour le texte, si elle existe est de 3*/ 
          var tout2 = "<img src='"+image2[0]+"' class='photo' width='"+image2[1]+"'  height='"+image[2]+"'>"
          var imageTextCommence2 = 3
        }
        /*Si l'image à une longueur de plus de 3 alors il y a aussi une image pour le texte à ajouter, cela est fait avec la variable imageTextCommence qui détermine quand l'image du texte commence, si par exemple imageTextCommence = 2, l'url de l'image est à l'index 2 et la mesure en px, em etc est à l'index de imageTextCommence+1 */ 
        if (image2.length>3){
            tout2+= "<h4 class='questionPhoto' style=\"background-image:url('"+image2[imageTextCommence2]+"');font-size:"+image2[imageTextCommence2+1]+";\">"+titre2+"</h4>"
        } else {
            /*Si il n'y a pas d'image alors on mais juste le texte*/ 
            tout2+= "<h4 class='question'>"+titre2+"</h4>"
        }
          if ((type2 =='checkbox') ||(type2 =='radio') ||(type2 =='select')){
      /*je créer un radio/select/checkbox par réponse possible*/ 
  for (i=0;i<question2.length;i++){
      /*Parce ce que les espaces et les apostrophe cause un problème j'ai créé une fonction appelée espace qui enlèves les hashtag et point-virgules et les remplaces par des espaces et des apostrophe, aucune des réponse possible ne contiennent des espaces ou des apostrophe, je mets des hashtag pour des espaces et des points virgules pour des apostrophes, la variable montreQuestion transforme les # et les ; en leur valeur respective pour que l'utilisateur voit un espace ou une apostrophe*/ 
      var montreQuestion2 = espace(question2[i],'#'," ");
       montreQuestion2 = espace(montreQuestion2,';',"'");
      if ((type2 =='checkbox') ||(type2 =='radio')){
        if ((type2 =='radio') && (i==0)){
             tout2+="<div class = 'contenir-radio'>"

        }
          /*Si c'est une checkbox ou un radio, je le créer, il doit y avoir un type, qui sera le type qu'il est et un name du nom choisi en haut et une valeur de la réponse possible soit question[i]*/ 
      tout2 += "<input type='"+type2+"' name='"+nom+"' value='"+question2[i]+"' id='"+question2[i]+"' class = '"+type2+"'>"
      if (type2 =='checkbox'){
      tout2+= "<label for='"+question2[i]+"' class ='checkbox-label' >"+montreQuestion2+"</label>"
      if (i%2!==0){
        tout2+="<br>"
      }
      } else {
      tout2+= "<label for='"+question2[i]+"' class ='radio-label' >"+montreQuestion2+"</label>" 
        if (i==question2.length-1){
            tout2+="</div>"
            
          }
      }
      } else if (type2 =='select'){
          /*Si c'est un select alors il faut d'abord commencer par créer un select avec son id et une option vide*/ 
          if (i === 0){
              tout2 += "<div class='select'><select id='"+id+"' class = 'select-box'>"+"<option></option>"
          }
          /*Le select doit avoir une valeur de question[i] donc l'option de réponses à l'index qu'on est donc 0,1,2 etc*/ 
          tout2+=" <option value='"+question2[i]+"' class = '"+type2+"'>"+montreQuestion2+"</option>"
           /*Si c'est la dernière réponse possible alors on doit fermer le select*/ 
          if (i == question2.length-1){
              tout2 += "</select></div>"
          }
      }
  }
      /*Si le type de question est un text alors on doit lui donner un label et le texte du label est choisi par moi et correspond a la question[0] puisque cette variable n'est pas nécessaire si le type de question est un texte j'ai décidé de l'utiliser pour déterminer quel serait le label de la question*/ 
  } else if (type2 =='text'){
          tout2 += '<div class="envellopeur"><div class="information"><input type="text" id="'+id+'" name="'+nom+'" class = "'+type2+'" required>'
          tout2 +='<label for="'+id+'" class="ligne-information">'+question2[0]+'</label></div></div>'
        }
        /*Je créer le bouton soumis mais cette fois ci il aura la valeur de pointChanger donc l'utilisateur perdra un certain nombre de points*/ 
        tout2 +=  "<br><button type ='button' value = 'Soumettre' class ='bouton' onclick=soumis('"+reponse2+"','"+nom+"','"+div+"','"+id+"','"+type2+"','"+site+"','"+points+"','"+pointChanger+"','"+image2+"');><span></span><span></span><span></span><span></span>Soumettre</button>"
      }
    /*La clé de ''tout'' sera la clé qui contiendra soit la nouvelle question ou sois l'ancienne, mais si elle contient la nouvelle question, ou toutnon, qui est juste tout sans les indices dépends de la chance*/
    if (chanceChanger<chance){
        localStorage.setItem("tout",tout2)
    } else {
        localStorage.setItem("tout",toutnon)
    }
 affiche.innerHTML = tout
}

function soumis(reponse,nom,div,id,type,site,points,indicePoints,image){
    /*Je définis bonneRep, soit les bonnes réponses et mauvaiseRep, soit les mauvaises réponse à zéro*/ 
  var bonneRep = 0;
  var mauvaiseRep = 0;
  reponse = reponse.split(",")
    /*Je change créer une variable affiche2 qui sera le message que l'utilisateur va voir quand il va cliquer sur soumettre*/
  var affiche2 = document.getElementById(div);
    /*Si le type de question est une checkbox/radio je dois la retrouver avec leur nom mais si c'est un select ou un texto je dois la retrouver avec leur id*/
if ((type =="checkbox") ||(type =="radio")){     
  var question = document.getElementsByName(nom)
} else if ((type =="select") ||(type =="text")){
var question = document.getElementById(id).value
} 
    /*Si le type de question n'est pas un test alors je dois le diviser au virgule pour avoir une listes qui contient toute les bonnes réponses*/
    /*Si le type de question est un checkbox ou un radio je dois aller voir toute les réponses et si ce que l'utilisateur à cliquer est une bonne réponses car la valeur des réponses pour les select et les text et la vrai valeur de la réponse et non un l'index de la réponse*/
  if ((type =="checkbox") ||(type =="radio")){  
  for (i=0;i<question.length;i++){
      /*Je définis la variable essayé à zéro, elle sera celle qui vois si l'utilisateur à cliquer sur une réponses qui ne correspond à aucune des réponses*/
      var essaye = 0
      if (question[i].checked){
          /*Le reste du code se passe seulement si l'utilisateurs à cliquer*/
          for (j=0;j<reponse.length;j++){
              /*Si l'utilisateurs à cliquer, et l'index de la réponses qu'il/elle à cliquer est le même que l'index des réponses, on ajoute 1 à essayé et 1 à bonne réponses*/
              if (question[i].value==reponse[j]){
                  essaye++
                  bonneRep++
              }
          }
          /*Si l'utilisateurs à cliquer, et essaye === 0 ça veut dire que sa réponses n'est égale à aucune des bonnes réponses donc c'est un mauvaise réponses et on ajoute un à mauvaiseRep*/
          if (essaye===0){
              mauvaiseRep++
          }
      }               
  }
} else if (type =="select"){
      /*Si le type de questions est un select, ou un texte cela veut dire qu'il y a une seule bonne réponse et aussi que la variable réponses est égale au nom de la réponses, par exemple si la bonne réponses est 7, réponses va être égale à 7 et non à l'index de la réponse 7 donc on peut juste vérifier si leur réponses est égales à la réponses, si ça l'est alors il on une bonneRep et 0 mauvaiseRep et si ça ne l'est pas il on 0 bonneRep et 1 mauvaiseRep*/
  if (question == reponse){
      bonneRep++
  } else {
      mauvaiseRep++
  }    
} else {
  var essaye = 0
    for (i=0;i<reponse.length;i++){
      question = espace(question," ","#");
      question = espace(question,"'",";");
      if ((reponse[i]==question) || (reponse[i]==question.toLowerCase())){
        bonneRep++
      }
    }
    if (bonneRep==0){
      mauvaiseRep++
    }
}
    /*la variable points est égales à parseInt de points, juste au cas ou points soit une string et non un integer*/
points = parseInt(points)
if (type!="text"){
    /*Si le type de questions n'est pas un texte alors le nombre de points que l'utilisateur à est égale au nombre de bonne réponses-le nombres de mauvaise réponses diviser par le nombres de bonnes réponses qu'il y a fois le nombres de points, par exemple si l'utilisateur à 2 bonnes réponses et une mauvaise réponses sur 2 bonne réponses total et le pointages totale est de 100, l'utilisateur aura ((2-1)/2)*100 soit 50 points*/
 var pointTrouver = ((bonneRep-mauvaiseRep)/reponse.length)*points
    var pointTrouverTricher = pointTrouver-indicePoints
 var bonneRepTotal = reponse.length
} else {
  var pointTrouver = bonneRep*points   
  var pointTrouverTricher = pointTrouver-indicePoints
  var bonneRepTotal = 1
}
    /*Si l'utilisateur à moins de 0 points, ce qui peut se passer si l'utilisateur à plus de mauvaise réponses que de bonnes réponses, on dira qu'il a obtenu 0 points*/
 if ((pointTrouver<0) || (pointTrouverTricher<0)){
     pointTrouver = 0
     pointTrouverTricher = 0
 }
if (site=="annee2.html"){
    localStorage.clear()
    /*Si le site sur lequel on va aller quand l'utilisateur clique sur page suivante est annee2.html cela veut dire que c'est la première question donc on doit mettre la variable score à zéro et de même pour la variable total*/
    localStorage.setItem('score', 0);
    localStorage.setItem('total', 0);
}
 if (localStorage.getItem('total')) {
     /*On ajoute le nombre de points trouver à la variable score, donc combien de points l'utilisateur à eu pour cette questions*/
    utilisateurScore = parseInt(localStorage.getItem('score')) + pointTrouverTricher;
     /*On ajoute le nombre de points total à maxscore*/
    maxScore = parseInt(localStorage.getItem('total')) + points;
     /*On mets la variable utilisateurScore et maxScore dans le localStorage pour qu'elle se rappelle du score quand on change de page*/
    localStorage.setItem('score', utilisateurScore);
    localStorage.setItem('total', maxScore);
}
    /*Le pourcentage de l'utilisateur est son score/score maximale * 100, si le score est un nombre exacte, donc  if (pourcentage==parseInt(pourcentage)), il n'y a rien a faire, mais sinon, si le score à un nombre décimal, donc if (pourcentage==pourcentage.toFixed(1)) le pourcentage sera égale au pourcentage avec un nombre décimal, sinon, ça veut dire qu'il y a plus d'un nombre décimal donc on montre juste les deux derniers. */
   var pourcentage = propre((utilisateurScore/maxScore)*100)
       pointTrouver = propre(pointTrouver)
       pointTrouverTricher = propre(pointTrouverTricher)
    /*Je créer le message qui dit à l'utilisateur combien de bonneRep il y a eu, combien de bonne réponses il/elle y a, combien de mauvaise réponses il/elle a eu, combien de point il/elle ont eu et combien de points il/elle on maintenant ainsi que leur moyenne*/
    image = image.split(",")
    var message =  "<img src='"+image[0]+"' class='photo' width='"+image[1]+"'><br>"
 message +=  "Vous avez "+bonneRep+"/"+bonneRepTotal+" bonne réponse et "+mauvaiseRep+" mauvaise réponse"
    if (pointTrouver==pointTrouverTricher){
 message+= "<br>Tu as recu " + pointTrouver+" points. Tu as maintenant "+ propre(utilisateurScore) + "/" + maxScore + "point. Tu as une moyennes de " + pourcentage + "%";
    } else {
        message+= "<br>Tu as recu " + pointTrouver +" mais tu a perdu " +indicePoints+" points, parce ce que tu as utilisé un indice.Tu as donc recu  "+pointTrouverTricher+" point et ton score est de "+ propre(utilisateurScore) + "/" + maxScore + "point. Tu as une moyenne de " + pourcentage + "%";
    }
   
   message+= "<br><button type = 'button' value = 'Page Suivante' class ='bouton'><a href='"+site+"'><span></span><span></span><span></span><span></span>Page Suivante</a></button>"
    
    /*Je créer le bouton pour aller sur la page suivante*/
    /*J'affiche le tout sur la page*/
     affiche2.innerHTML = message
    /*Si les indices sont toujours là alors je l'ai enlevé de la page*/
    document.getElementById("indice").remove();
}
function indice(div) {
  var affiche3 = document.getElementById("indice"); // crée une variable qui contient l'élément à afficher, si elle existe
  if (affiche3) { // regarde si l'élément existe
    affiche3.remove(); // enlève si il existe
  } else {
    // Créer l'élement si il n'existe pas
    centrer = document.createElement("center");
    affiche3 = document.createElement("div");
    affiche3.id = "indice";
    affiche3.classList.add("indice");
      var chanceChanger = localStorage.getItem("chanceChanger");
        var changePoint = localStorage.getItem("changePoint");
        var chanceEnseignant = localStorage.getItem("chanceEnseignant");
        var chanceEleve = localStorage.getItem("chanceEleve")
        var pointEleve = localStorage.getItem("pointEleve")
      if (chanceChanger<100){
    var button = document.createElement("button");
    button.innerHTML = 'Changer de question';
    button.type = "button";
    button.classList.add("indices");
    button.onclick = function changeQuestion(){
       document.getElementById("indice").remove();
       afficher2 = document.getElementById(div)       
       afficher2.innerHTML = localStorage.getItem("tout")
    }
          var texte = document.createElement("p");
          texte.classList.add("texte")
          texte.innerHTML = "Tu peux changer de question mais il y a "+chanceChanger+ "% de chance que ça ne marche pas et si ça marche tu perdra "+changePoint+" points, mais tu ne perdras jamais de points si tu triche et as la mauvaise réponse";
          affiche3.appendChild(texte);
          affiche3.appendChild(button);
      }
      if (chanceEnseignant<100){
      var button2 = document.createElement("button");
      button2.innerHTML = 'Demander à ton enseignant';
      button2.type = "button";
      button2.classList.add("indices");
      button2.onclick = function enseignant(){
         document.getElementById("indice").remove();
         afficher2 = document.getElementById(div)       
         afficher2.innerHTML = localStorage.getItem("toutEnseignant")
      }
      var texte2 = document.createElement("p");
      texte2.classList.add("texte");
      texte2.innerHTML = "Tu peux demander à ton enseignant mais il y a "+chanceEnseignant+ "% de chance que ça ne marche pas, mais que ça marche ou ne marche pas tu ne perdra pas de points"
      affiche3.appendChild(texte2);
      affiche3.appendChild(button2);
      }
      if (chanceEleve<100){
      var button3 = document.createElement("button");
      button3.innerHTML = 'Demander à un élève';
      button3.type = "button";
      button3.classList.add("indices");
      button3.onclick = function eleve(){
      document.getElementById("indice").remove();
         afficher2 = document.getElementById(div)       
         afficher2.innerHTML = localStorage.getItem("toutEleve")
      }
      var texte3 = document.createElement("p");
      texte3.classList.add("texte");
        texte3.innerHTML = "Tu peux demander a un eleve mais il y a "+chanceEleve+ "% de chance que l'élève n'accepte pas de donner la réponse, de plus si sa marche et l'élève te dis la réponse tu perdra "+pointEleve+" points, sur ton score total";
      affiche3.appendChild(texte3);
      affiche3.appendChild(button3);
      }
      centrer.appendChild(affiche3)
    document.body.appendChild(centrer); // Ajoute l'élément à la page
}
}






















