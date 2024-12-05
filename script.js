function aleatoire(max){
  var numbre = parseInt(Math.random()*max)
  return numbre
}
function creer(titres,questions,reponses,div,nom,types,id,site,){
  var questionChoisi = aleatoire(questions.length)
  var question = questions[questionChoisi]
  var affiche = document.getElementById(div);
  var reponse = reponses[questionChoisi]
  var type = types[questionChoisi]
  var titre = titres[questionChoisi]
  var tout = titre + "<br>"
  for (i=0;i<question.length;i++){
      if ((type =='checkbox') ||(type =='radio')){
      tout += "<input type='"+type+"' name='"+nom+"' value='"+question[i]+"'>"+question[i]
      } else if ((type =='select')){
          if (i == 0){
              tout += "<select id='"+id+"'>"+"<option></option>"
          }
          tout+=" <option value='"+i+"'>"+question[i]+"</option>"
          if (i == question.length-1){
              tout += "</select>"
          }
      }

      if (i%2!=0){
          tout = tout + '<br>'
      }
  }
   tout += "<br><input type ='button' onclick=soumis('"+reponse+"','"+nom+"','"+div+"','"+id+"','"+type+"','"+site+"'); value = 'Soumettre'>"
 affiche.innerHTML = tout
}
function soumis(reponse,nom,div,id,type,site){
  var bonneRep = 0
  var mauvaiseRep = 0
  var affiche2 = document.getElementById(div);
if ((type =="checkbox") ||(type =="radio")){     
  var question = document.getElementsByName(nom)
} else if (type =="select"){
var question = document.getElementById(id).value
}
  var reponse = reponse.split(",")    
  if ((type =="checkbox") ||(type =="radio")){  
  for (i=0;i<question.length;i++){
      var essaye = 0
      if (question[i].checked){
          for (j=0;j<reponse.length;j++){
              if (i==reponse[j]){
                  essaye++
                  bonneRep++
              }
          }
          if (essaye==0){
              mauvaiseRep++
          }
      }               
  }
} else if (type =="select"){
  if (question == reponse){
      bonneRep++
  } else {
      mauvaiseRep++
  }    
}
var message = "Vous avez "+bonneRep+"/"+reponse.length+" bonne réponse et "+mauvaiseRep+" mauvaise réponse"
  message+= "<br><button type = 'button' value = 'Page Suivante' class ='suivante'><a href='"+site+"'>Page Suivante</a></button>"
     affiche2.innerHTML = message
}

