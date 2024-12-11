function espace(reponse,changer,changerPour){
    text = ""
    reponse = String(reponse)
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
function creer(titres,questions,reponses,div,nom,types,id,site,points,tricher,chancePoints,images){
    //Cette fonction créer un questionnaire avec les paramètres données, comme le titres, les questions, les réponses, le type de questions, etc
      /*Pour ce faire on créer premièrement la variable chance qui est un nombre aléatoire entre 0-100, ce nombre va déterminer la chance que la personne a eu et ce qu'il/elle va pouvoir faire, par exemple, disons qu'il/elle a obtenu 20 sur 100, ça veut dire que si il utilise un indice, ça marchera seulement si l'indice qu'il demande se passe 80% (100-20)% du temps ou plus souvent.*/
    var chance = aleatoire(100)
    var chanceChanger = 100-chancePoints[0][0]
    var pointChanger = chancePoints[1][0]
    var chanceEnseignant = 100-chancePoints[0][1]
    var chanceEleve = 100-chancePoints[0][2]
    var pointEleve = chancePoints[1][1]
    /*Je créer un variable pour tous les montants de chance que la personne a besoin pour avoir leur indice et créer aussi une variable pour tous les points qu'il perdront s' il ont leur indice.*/
localStorage.setItem("chanceChanger",chanceChanger)
    localStorage.setItem("changePoint",pointChanger)
    localStorage.setItem("chanceEnseignant",chanceEnseignant)
    localStorage.setItem("chanceEleve",chanceEleve)
    localStorage.setItem("pointEleve",pointEleve)
    /*Je stocke ensuite toutes les variables mentionnées précédemment grâce à la fonction localStorage, pour que d'autre fonction puisse les utiliser.*/
    /*Je choisis ensuite un nombre aléatoire avec un étendu qui est le nombre de questions qu'il y a, si il y a 2 questions ça sera soit 0 ou 1 et ainsi de suite.*/
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
    /*l'ajout de l'image va être assez complexe car Je veux pouvoirs décider si j'ajouterais une image, ou une image et un titre avec une image en arrière, je commence par vérifier si l'image à une longueur de 2 ou si l'élément à l'index 2 n'est pas un nombre si l'une de ces conditions est vrai alors j'ai seulement besoin de dire la width et la variable imageTextCommence qui définit quand est ce que la prochaine image qui sera pour le texte à un valeur de 2 car si elle existe elle sera après l'url de l'image donc 0, et après la width donc 1, donc elle sera à 2*/ 
    if ((image.length==2) || (isNaN(image[2])==true)){
    var tout = "<img src='"+image[0]+"' class='photo' width='"+image[1]+"'><br>"
       var imageTextCommence = 2
    } else {
        /*Si aucunes des deux conditions n'est vrai ça veut dire  que l'image à une width et une height, la variable imageTextCommence détermine l'index à laquel la prochaine image va commencer, si il y à l'url de l'image, le width et le height ça veut dire que l'index de la prochaine image pour le texte, si elle existe est de 3*/ 
        var tout = "<img src='"+image[0]+"' class='photo' width='"+image[1]+"' height='"+image[2]+"'><br>"
       var imageTextCommence = 3
    }
    /*Si l'image à une longueur de plus de 3 alors il y a aussi une image pour le texte à ajouter, cela est fait avec la variable imageTextCommence qui détermine quand l'image du texte commence, si par exemple imageTextCommence = 2, l'url de l'image est à l'index 2 et la mesure en px, em etc est à l'index de imageTextCommence+1 */ 
    if (image.length>3){
        tout+= "<h1 class='questionPhoto' style=\"background-image:url('"+image[imageTextCommence]+"');font-size:"+image[imageTextCommence+1]+";\">"+titre+"</h1>"
    } else {
        /*Si il n'y a pas d'image alors on mais juste le texte*/ 
        tout+= "<h1 class='question'>"+titre+"</h1>"
    }
    /*Si le type de question est une checkbox, un radio ou un select, il faut y avoir un radio/select/checkbox par réponse possible*/ 
  if ((type =='checkbox') ||(type =='radio') ||(type =='select')){
      /*je créer un radio/select/checkbox par réponse possible*/ 
  for (i=0;i<question.length;i++){
      /*Parce ce que les espaces et les apostrophe cause un problème j'ai créé une fonction appelée espace qui enlèves les hashtag et point-virgules et les remplaces par des espaces et des apostrophe, aucune des réponse possible ne contiennent des espaces ou des apostrophe, je mets des hashtag pour des espaces et des points virgules pour des apostrophes, la variable montreQuestion transforme les # et les ; en leur valeur respective pour que l'utilisateur voit un espace ou une apostrophe*/ 
      var montreQuestion = espace(question[i],'#'," ");
       montreQuestion = espace(montreQuestion,';',"'");
      if ((type =='checkbox') ||(type =='radio')){
          /*Si c'est une checkbox ou un radio, je le créer, il doit y avoir un type, qui sera le type qu'il est et un name du nom choisi en haut et une valeur de la réponse possible soit question[i]*/ 
      tout += "<input type='"+type+"' name='"+nom+"' value='"+question[i]+"' id='"+question[i]+"' class = '"+type+"'>"
      tout+= "<label for='"+question[i]+"'>"+montreQuestion+"</label>"
          /*On créer une nouvelle ligne à chaque 2 questions*/ 
            if (i%2!==0){
                tout = tout + '<br>'
            }
      } else if ((type =='select')){
          /*Si c'est un select alors il faut d'abord commencer par créer un select avec son id et une option vide*/ 
          if (i === 0){
              tout += "<div class='select'><select id='"+id+"' class = 'select-box'>"+"<option></option>"
          }
          /*Le select doit avoir une valeur de question[i] donc l'option de réponses à l'index qu'on est donc 0,1,2 etc*/ 
          tout+=" <option value='"+question[i]+"' class = '"+type+"'>"+montreQuestion+"</option>"
           /*Si c'est la dernière réponse possible alors on doit fermer le select*/ 
          if (i == question.length-1){
              tout += "</select></div>"
          }
      }
  }
      /*Si le type de question est un text alors on doit lui donner un label et le texte du label est choisi par moi et correspond a la question[0] puisque cette variable n'est pas nécessaire si le type de question est un texte j'ai décidé de l'utiliser pour déterminer quel serait le label de la question*/ 
  } else if (type =='text'){
      tout += '<label for="'+id+'">'+question[0]+'</label>'
      tout +='<input type="text" id="'+id+'" name="'+nom+'" class = "'+type+'">'

  }
    /*La variable toutEleve est égale à tout les images/titres/question/réponses etc que je viens de créer, sauf le bouton soumis car le boutons soumis prend aussi un autre paramètre qui est le nombre de points que l'utilisateur à perdu, il est à zéro si l'utilisateur n'utilise aucun indice et à une variable, soit point Changer, si l'utilisateur change de questions et à pointEleve si l'utilisateur demande à un élève*/ 
    var toutEleve = tout
    /*Je créer un bouton qui accomplis la fonction soumis quand il est cliqué et cette fonction regarde à la réponse et dit à l'utilisateur si il/elle à la bonne réponse*/ 
   tout += "<br><input type ='button' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"','"+points+"',0,'"+image+"'); value = 'Soumettre'>"
    var toutnon = tout
    var toutEnseignant = tout
    if (tricher==true){
        /*Je créer un bouton indice seulement si l'utilisateur à le droit de tricher*/ 
        tout += "<br><button type = 'button' value = 'retourner' onclick=indice('"+div+"'); >Indice</button><p class = 'textIndice' display ='inline'>Appui sur indice pour voir tout les indices possibles que tu peux avoir</p>"
    }
    /*toutReponse sera toute une variables qui va stocker toute les réponses pour les données si la personnes est chanceuse*/ 
    var toutReponse = ""
    /*La for loop qui donne toute les réponses va itérer pour le nombre de réponses qu'il y a, donc si il y a 2 réponses sa va itérer 2 fois*/ 
    for (i=0;i<reponse.length;i++){
        /*La variable laReponse est la réponses avec # transformer en espace et les points virgule transformer en apostrophe pour que l'utilisateur voit la vrai réponse et non par exemple La#Russie si la réponse est La Russie*/
        var laReponse = espace(reponse[i],'#'," ");
             laReponse = espace(laReponse,';',"'");
        if ((reponse.length!=1) && (i==0)){
            /*Si il y a plus d'une réponse on doit commencer par les bonnes réponses, dire la première réponses et ensuite et*/
        toutReponse += " Les bonnes réponses sont "+laReponse+" et "
        } else if ((reponse.length!=1) && (i!=reponse.length-1)){
            /*Si il y a plus d'une bonne réponses et qu'on n'est pas à la dernière réponses on doit dire la réponses et ensuite et*/
            toutReponse += laReponse+" et "
        } else if (reponse.length!=1){
            /*Se else if se passe seulement si il y a plus d'une réponses, et si le else if se passe ca veut dire que c'est la dernière réponse donc pas besoin de dire et*/
            toutReponse += laReponse
        } else {
            /*Se si se passe seulement si il y a une seul bonne réponse et si c'est le cas on doit juste dire, la bonne réponses est + la réponses*/
            toutReponse += "La bonnes réponse est "+ laReponse
        }

    }
    /*Si la chance que l'utilisateur puisse demander à leur enseignant définis par moi au début et 100-la chance définis par moi donc disons, 100-20 soit 80, si cette chance est plus petit que la chance choisis aléatoirement au début donc disons 81, si c'est le cas on montrera toutes les réponses, sinon, on montre quelque chose d'autre*/
    if (chanceEnseignant<chance){
            toutEnseignant += "<br>"+toutReponse
    } else {
        /*L'autre message choisi est un nombre entre 0-3, excluant 3, donc 0-2, si le nombre est 0 j'envoie un message que l'enseignant ne va pas répondres à ta question, si c'est 1 j'envoie un autre message, si c'est 2 j'envoie un autre message cela rends le message plus aléatoire et moins statique*/
        aucuneChanceEnseignant = aleatoire(3)
        if (aucuneChanceEnseignant==0){
            aucuneChanceEnseignant = "<br>Tu le saurais si tu avais étudié"
        } else if (aucuneChanceEnseignant==1){
            aucuneChanceEnseignant = "<br>Je ne peux pas de dire la/les réponse/s"
        } else {
            aucuneChanceEnseignant = "<br>C'est un test, je ne peux pas répondre à cette question pour toi"
        }
        toutEnseignant += aucuneChanceEnseignant
    }
    /*On a ici un code très similaire au code pour demander à l'enseignant, mais pour demande à l'élève il faut d'abord créer le bouton soumis, la raison pour sa est que l'un des paramètres pour soumettre est le nombre de point retirer, si l'élève te répond on t'enlève des points, sinon on ne t'enlève pas de points, c'est pour cela qu'on doit créer un bouton soumis.*/
    if(chanceEleve<chance){
        toutEleve += "<br><input type ='button' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"','"+points+"',"+pointEleve+",'"+image+"'); value = 'Soumettre'>"
        toutReponse +=" mais tu m'en dois une"
        toutEleve += "<br>"+toutReponse
    } else {
        toutEleve += "<br><input type ='button' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"','"+points+"',0,'"+image+"'); value = 'Soumettre'>"
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
      var tout2 = "<img src='"+image2[0]+"' class='photo' width='"+image2[1]+"'><br>"
       var imageTextCommence2 = 2
        } else {
          /*Si aucunes des deux conditions n'est vrai ça veut dire  que l'image à une width et une height, la variable imageTextCommence détermine l'index à laquel la prochaine image va commencer, si il y à l'url de l'image, le width et le height ça veut dire que l'index de la prochaine image pour le texte, si elle existe est de 3*/ 
          var tout2 = "<img src='"+image2[0]+"' class='photo' width='"+image2[1]+"'  height='"+image[2]+"'><br>"
          var imageTextCommence2 = 3
        }
        /*Si l'image à une longueur de plus de 3 alors il y a aussi une image pour le texte à ajouter, cela est fait avec la variable imageTextCommence qui détermine quand l'image du texte commence, si par exemple imageTextCommence = 2, l'url de l'image est à l'index 2 et la mesure en px, em etc est à l'index de imageTextCommence+1 */ 
        if (image2.length>3){
            tout2+= "<h1 class='questionPhoto' style=\"background-image:url('"+image2[imageTextCommence2]+"');font-size:"+image2[imageTextCommence2+1]+";\">"+titre2+"</h1>"
        } else {
            /*Si il n'y a pas d'image alors on mais juste le texte*/ 
            tout2+= "<h1 class='question'>"+titre2+"</h1>"
        }
        if ((type2 =='checkbox') ||(type2 =='radio') ||(type2 =='select')){
          /*je créer un radio/select/checkbox par réponse possible*/ 
          for (i=0;i<question2.length;i++){
            /*Parce ce que les espaces et les apostrophe cause un problème j'ai créer une fonction appelée espace qui enlèves les hashtag et point-virgules et les remplaces par des espaces et des apostrophe, aucune des réponse possible ne contiennent des espaces ou des apostrophe, je mets des hashtag pour des espaces et des points virgules pour des apostrophes, la variable montrQuestion retransforme les # et les ; en leur valeur respective pour que l'utilisateur voit un espace ou une apostrophe*/ 
            var montreQuestion2 = espace(question2[i],'#'," ");
            montreQuestion2 = espace(montreQuestion2,';',"'");
            if ((type2 =='checkbox') ||(type2 =='radio')){
              /*Si c'est une checkbox ou un radio, je le crée, il doit y avoir un type du type qu'il est et un name du nom choisi en haut et une valeur de la réponse possible soit question2[i]*/ 
              tout2 += "<input type='"+type2+"' name='"+nom+"' value='"+question2[i]+"' id='"+question2[i]+"' class ='"+type2+"'>"
              tout2 += "<label for='"+question2[i]+"'>"+montreQuestion2+"</label>"
              /*On créer une nouvelle ligne à chaque 2 questions*/ 
              if (i%2!==0){
                tout2 = tout2 + '<br>'
              }
            } else if ((type2 =='select')){
              /*Si c'est un select alors il faut d'abord commencer par créer un select avec son id et une option vide*/ 
              if (i === 0){
                tout2 += "<div class='select'><select id='"+id+"' class ='"+type2+"'>"+"<option></option>"
              }
              /*Le select doit avoir une valeur de question2[i], donc l'option de réponses possible à laquel on est, et je montre à l'utilisateur la réponses sans # et ;*/ 
              tout2 +=" <option value='"+question2[i]+"'>"+montreQuestion2+"</option>"
              /*Si c'est la dernière réponse possible alors on doit fermer le select*/ 
              if (i == question2.length-1){
                  tout2 += "</select></div>"
              }
            }
          }
          /*Si le type de question est un text alors on doit lui donner un label et le texte du label est choisi par moi et correspond a la question[0] puisque cette variable n'est pas nécessaire si le type de question est un texte j'ai décidé de l'utiliser pour déterminer quel serait le label de la question*/ 
        } else if (type2 =='text'){
          tout2 += '<label for="'+id+'">'+question2[0]+'</label>'
          tout2 +='<input type="text" id="'+id+'" name="'+nom+'" class = "'+type2+'">'
        }
        /*Je créer le bouton soumis mais cette fois ci il aura la valeur de pointChanger donc l'utilisateur perdra un certain nombre de points*/ 
        tout2 += "<br><input type ='button' onclick=soumis('"+reponse2+"','"+nom+"','"+div+"','"+id+"','"+type2+"','"+site+"','"+points+"',"+pointChanger+",'"+image+"'); value = 'Soumettre'>"
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
    /*Je change créer une variable affiche2 qui sera le message que l'utilisateur va voir quand il va cliquer sur soumettre*/
  var affiche2 = document.getElementById(div);
    /*Si le type de question est une checkbox/radio je dois la retrouver avec leur nom mais si c'est un select ou un texto je dois la retrouver avec leur id*/
if ((type =="checkbox") ||(type =="radio")){     
  var question = document.getElementsByName(nom)
} else if ((type =="select") ||(type =="text")){
var question = document.getElementById(id).value
} 
    /*Si le type de question n'est pas un text alors je dois le diviser au virgule pour avoir une listes qui contient toute les bonnes réponses*/
    if (type!="text"){
   reponse = reponse.split(",")    
    }
    /*Si le type de question est un checkbox ou un radio je dois aller voir toute les réponses et si ce que l'utilisateur à cliquer est une bonne réponses car la valeur des réponses pour les select et les text et la vrai valeur de la réponse et non un l'index de la réponse*/
  if ((type =="checkbox") ||(type =="radio")){  
  for (i=0;i<question.length;i++){
      /*Je définis la variable essaye à zéro, elle sera celle qui vois si l'utilisateur à cliquer sur une réponses qui ne correspond à aucune des réponses*/
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
} else if ((type =="select") || (type =="text")){
      /*Si le type de questions est un select, ou un texte cela veut dire qu'il y a une seule bonne réponse et aussi que la variable réponses est égale au nom de la réponses, par exemple si la bonne réponses est 7, réponses va être égale à 7 et non à l'index de la réponse 7 donc on peut juste vérifier si leur réponses est égales à la réponses, si ça l'est alors il on une bonneRep et 0 mauvaiseRep et si ça ne l'est pas il on 0 bonneRep et 1 mauvaiseRep*/
  if (question == reponse){
      bonneRep++
  } else {
      mauvaiseRep++
  }    
} 
    /*la variable points est égales à parseInt de points, juste au cas ou points soit une string et non in interger*/
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
    /*Le pourcentage de l'utilisateur est son score/score maximale * 100, si le score est un nombre exacte, donc  if (pourcentage==parseInt(pourcentage)), il n'y a rien a faire, mais sinon, si le score à un nombre décimal, donc if (pourcentage==pourcentage.toFixed(1)) le pourcentage sera égale au pourcentage avec un nombre décimal, sinon, sa veut dire qu'il y a plus d'un nombre décimal donc on montre juste les deux derniers. */
   var pourcentage = ((utilisateurScore/maxScore)*100)
    if (pourcentage!=parseInt(pourcentage)){
        if (pourcentage==pourcentage.toFixed(1)){
            pourcentage = pourcentage.toFixed(1)
        } else {
            pourcentage = pourcentage.toFixed(2)
        }
    }
    /*Je créer le message qui dit à l'utilisateur combien de bonneRep il y a eu, combien de bonne réponses il/elle y a, combien de mauvaise réponses il/elle a eu, combien de point il/elle ont eu et combien de points il/elle on maintenant ainsi que leur moyenne*/
    image = image.split(",")
    var message =  "<img src='"+image[0]+"' class='photo' width='"+image[1]+"'><br>"
 message +=  "Vous avez "+bonneRep+"/"+bonneRepTotal+" bonne réponse et "+mauvaiseRep+" mauvaise réponse"
    if (pointTrouver==pointTrouverTricher){
 message+= "<br>Tu as recu " + pointTrouver+" points. Tu as maintenant "+ utilisateurScore + "/" + maxScore + "point. Tu as une moyennes de " + pourcentage + "%";
    } else {
        message+= "<br>Tu as recu " + pointTrouver +" mais tu a perdu " +indicePoints+" points, parce ce que tu as tricher.Tu as donc recu  "+pointTrouverTricher+" point et ton score est de "+ utilisateurScore + "/" + maxScore + "point. Tu as une moyennes de " + pourcentage + "%";
    }
    /*Je créer le bouton pour aller sur la page suivante*/
  message+= "<br><button type = 'button' value = 'Page Suivante' class ='suivante'><a href='"+site+"'>Page Suivante</a></button>"
    /*J'affiche le tout sur la page*/
     affiche2.innerHTML = message
    /*Si les indices sont toujours la alors je l'ai enlève de la page*/
    document.getElementById("indice").remove();
}
function indice(div) {
  var affiche3 = document.getElementById("indice"); // crée une variable qui contient l'élément à afficher, si elle existe
  if (affiche3) { // regarde si l'élément existe
    affiche3.remove(); // enlève si il existe
  } else {
    // Créer l'élement si il n'existe pas
    affiche3 = document.createElement("div");
    affiche3.id = "indice";
      var chanceChanger = localStorage.getItem("chanceChanger");
        var changePoint = localStorage.getItem("changePoint");
        var chanceEnseignant = localStorage.getItem("chanceEnseignant");
        var chanceEleve = localStorage.getItem("chanceEleve")
        var pointEleve = localStorage.getItem("pointEleve")
      if (chanceChanger<100){
    var button = document.createElement("button");
    button.innerHTML = 'Changer de question';
    button.type = "button";
    button.onclick = function changeQuestion(){
       document.getElementById("indice").remove();
       afficher2 = document.getElementById(div)       
       afficher2.innerHTML = localStorage.getItem("tout")
    }
          var texte = document.createElement("p");
          texte.innerHTML = "Tu peux changer de question mais il y a "+chanceChanger+ "% de chance que sa ne marche pas et si sa marche tu perdra "+changePoint+" points, mais tu ne perderas jamais de points si tu triche et as la mauvaise réponse, because at this point its just a skill issue";
          affiche3.appendChild(texte);
          affiche3.appendChild(button);
      }
      if (chanceEnseignant<100){
      var button2 = document.createElement("button");
      button2.innerHTML = 'Demander à ton enseignant';
      button2.type = "button";
      button2.onclick = function enseignant(){
         document.getElementById("indice").remove();
         afficher2 = document.getElementById(div)       
         afficher2.innerHTML = localStorage.getItem("toutEnseignant")
      }
      var texte2 = document.createElement("p");
      texte2.innerHTML = "Tu peux demander à ton enseignant mais il y a "+chanceEnseignant+ "% de chance que sa ne marche pas, mais que sa marche ou ne marche pas tu ne perdra pas de points"
      affiche3.appendChild(texte2);
      affiche3.appendChild(button2);
      }
      if (chanceEleve<100){
      var button3 = document.createElement("button");
      button3.innerHTML = 'Demander a un eleve';
      button3.type = "button";
      button3.onclick = function eleve(){
      document.getElementById("indice").remove();
         afficher2 = document.getElementById(div)       
         afficher2.innerHTML = localStorage.getItem("toutEleve")
      }
      var texte3 = document.createElement("p");
        texte3.innerHTML = "Tu peux demander a un eleve mais il y a "+chanceEleve+ "% de chance que l'eleve n'accepte pas de donner la reponse, de plus si sa marche et l'eleve te dis la reponse tu perdra "+pointEleve+" points, sur ton score total";
      affiche3.appendChild(texte3);
      affiche3.appendChild(button3);
      }
    document.body.appendChild(affiche3); // Ajoute l'élément à la page
}
}



