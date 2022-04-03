//      TO DO list controller
var listController = (function () {
	var newListIem = function(id,tittle,date,detail,prio,val,cmpl){
		this.id = id;
		this.tittle = tittle;
		this.date = date;
		this.detail = detail;
		this.priority = prio;
		this.value = val;
		this.complete = cmpl;
	};

	var data = {
		allItem : []
	};
	var returnval = function(prio){
			var value;
			if(prio == "Medium"){
				value = 3;
			}
			else if(prio == "Low"){
				value = 4;
			}
			else if(prio == "Lowest"){
				value = 5;
			}
			else if(prio == "High"){
				value = 2;
			}
			else if(prio == "Highest"){
				value = 1;
			}
			return value;
		};
	return{
		setLocal : function(){
			localStorage.setItem('localData',JSON.stringify(data));
		},
		localTOGet : function(){
			var storage,newList;
			newList = [];
			storage = localStorage.getItem('localData');

			if(storage){
				data = JSON.parse(storage);

				data.allItem.forEach(function(curn){
					newList.push(new newListIem(curn.id,curn.tittle,curn.date,curn.detail,curn.priority,curn.value,curn.complete));
				})

				data.allItem = newList;
			}
			return data;
		},
		
		addItem : function(tittle,date,detail,prio,cmpl){
			var newItem,ID,value;
			value = returnval(prio);
			if (data.allItem.length > 0) {
				ID = data.allItem[data.allItem.length-1].id+1;
				
			}
			else{
				ID=0;
			}
			newItem = new newListIem(ID,tittle,date,detail,prio,value,cmpl);

			data.allItem.push(newItem);

			return newItem;

		},
		editFromList : function(index){
			var splitID,ID,ids,value,obj;
			obj = UIController.getInput();
			
			data.allItem[index].tittle = obj.getName;
			data.allItem[index].date = obj.getDate;
			data.allItem[index].detail = obj.getDetail;
			data.allItem[index].priority = obj.getPrio;
			data.allItem[index].value = returnval(obj.getPrio);
			
			return 	data.allItem[index];
		},
		deletefromList : function(id){
			var ids,index;

			ids = data.allItem.map(function(curn){
				return curn.id;
			});

			index = ids.indexOf(id);

			if(index !== -1){

			data.allItem.splice(index,1);
			
			}
		},
		cmplfromList : function(id){

			data.allItem.forEach(function(x,n){
				if(x.id == id){
					x.complete = true;	
				}
			});
		},
		sortByDate : function (){
			data.allItem.sort(function(a,b){
				return new Date(b.date) -  new Date(a.date);
			});

			return data.allItem;

		},
		sortByPrio : function (){
			data.allItem.sort(function(a,b){
				return b.value - a.value;
			});

			return data.allItem;
		},
		sortById : function(){
			data.allItem.sort(function(a,b){
				return a.id - b.id;
			});

			return data.allItem;
		},
		getData : function(){
			return data;
		}
	}
})();


//   UI Controller
var UIController = (function(){
	var DOMString = {
		addForm : ".addItemBox",
		pagecover : ".pageCover",
		addDisplay : ".addItem",
		addBtn : "#additem",
		cancel : "#cancel",
		okbtn : ".ok",
		addTOcontent : ".content",
		inputTittle : ".inputName",
		inputDate : ".inputDate",
		inputDetails : ".inputDetail",
		inputPrio : ".add__type",
		container : ".content",
		chekBox : ".cheking",
		sortDateBtn : ".sortDate",
		sortPrioBtn : ".sortPrio",
		recentBtn : ".recent",
		cmplBTN : '.cmpl',
		checkedDel : '.deleteCheked',
		popCncl : '.cncl',
		confDel : '.confDelete',
		popBox : '.deletepop'
 	}
 	var returnColor = function(prio){
 		var color,colorObj;

 		colorObj = {Medium : "#93c54b",
						Low : "#29abe0",
						Lowest : "#325d88",
						High : "#f47c3c",
						Highest : "#d9534f"
					};
			if(prio == "Medium"){
				color = colorObj.Medium;
			}
			else if(prio == "Low"){
				color = colorObj.Low;
			}
			else if(prio == "Lowest"){
				color = colorObj.Lowest;
			}
			else if(prio == "High"){
				color = colorObj.High;
			}
			else if(prio == "Highest"){
				color = colorObj.Highest;
			}
			return color;
 	};
	return {
		getInput : function(){
			return{
				getName : document.querySelector(DOMString.inputTittle).value,
				getDate : document.querySelector(DOMString.inputDate).value,
				getDetail : document.querySelector(DOMString.inputDetails).value,
				getPrio : document.querySelector(DOMString.inputPrio).value
			}
		},
		addFromUI : function(obj){
			var html,newHtml,color; //{Medium:'',:ow:}
			 color = returnColor(obj.priority);
			html = "<div class='listItem' id='item-%id%'>	<div class='topLine'>	<button class='priorityBtn' style='background-color:%color%'>%prio%</button>	<span id='title' class='%text%'>%Tittle%</span> --- <span id='detail' class='%text%' >%Content%</span>	</div>	<div class='bottomLine'>	<div class='editOption'>	<span>Due : </span><span>%date%</span>	<label class='rmck'>	<input id='removeCk' class='deleteBtn' type='checkbox' name='complete' >	 Remove	</label>	<i id='editItem-%edId%' class='far fa-edit deleteItem'> Edit</i>	<label class='deleteItem cmpl'>	<input id='cheking' type='checkbox' value='0' name='complete' %%>	Complete	</label>	</div>	</div>	</div>";	

			newHtml = html.replace("%id%",obj.id);
			newHtml = newHtml.replace("%edId%",obj.id);
			newHtml = newHtml.replace("%prio%",obj.priority);
			newHtml = newHtml.replace("%Tittle%",obj.tittle);
			newHtml = newHtml.replace("%Content%",obj.detail);
			newHtml = newHtml.replace("%date%",obj.date);
			newHtml = newHtml.replace("%color%",color);
			if(obj.complete){
				newHtml = newHtml.replace("%text%","fnStyle");
				newHtml = newHtml.replace("%text%","fnStyle");
				newHtml = newHtml.replace("%%","checked");
			}
			document.querySelector(DOMString.addTOcontent).insertAdjacentHTML('afterbegin',newHtml);
		},
		deleteItemFromUI : function(itemID){
			var ele=document.getElementById(itemID);
			ele.parentNode.removeChild(ele);
		},
		editFromUI : function(event,obj){

			var nodel = event.target.parentNode.parentNode.previousElementSibling;
			nodel.childNodes[3].textContent = obj.tittle;
			nodel.childNodes[5].textContent = obj.detail;
			nodel.childNodes[1].textContent = obj.priority;
			event.target.parentNode.childNodes[2].textContent = obj.date;

			nodel.childNodes[1].style = "background-color:"+returnColor(obj.priority)+";"
		},
		clearFields : function(){
			var fields = document.querySelectorAll(DOMString.inputTittle+","+DOMString.inputDate+","+DOMString.inputDetails);
				fields.forEach(function(curn){
					curn.value="";
				});
				document.querySelector(".add__type").value="Medium";
		},
		getDomString : function(){
			return DOMString;
		},
	}
})();


// Global App controller
var appController = (function(listCntrl,UICntrl){
	var data,DOM;
	 DOM = UICntrl.getDomString();
	 data = listCntrl.getData();

	var setUpEventListener = function(){
		viewForm();

		document.querySelector(DOM.addDisplay).addEventListener('click',viewForm);

		document.querySelector(DOM.cancel).addEventListener('click',viewForm);

		document.querySelector(DOM.okbtn).addEventListener('click',okEdit);

		// document.querySelector(DOM.pagecover).addEventListener('click',viewForm);

		document.querySelector(DOM.addBtn).addEventListener('click', addCntrlItem);
		
		document.querySelector(DOM.container).addEventListener('click',completeEd);

		document.querySelector(DOM.sortPrioBtn).addEventListener('click',function(){
			dataAddFromUI(listCntrl.sortByPrio());
		});
		document.querySelector(DOM.checkedDel).addEventListener('click',function(){
			document.querySelector(DOM.popBox).classList.toggle("displ");
			document.querySelector(DOM.pagecover).classList.toggle("displ");
		});
		document.querySelector(DOM.sortDateBtn).addEventListener('click',function(){
			dataAddFromUI(listCntrl.sortByDate());
		});

		document.querySelector(DOM.recentBtn).addEventListener('click',function(){
			dataAddFromUI(listCntrl.sortById());
		});

		document.querySelector(DOM.popCncl).addEventListener('click',function(){
			document.querySelector(DOM.popBox).classList.toggle("displ");
			document.querySelector(DOM.pagecover).classList.toggle("displ");
			document.querySelectorAll('.deleteBtn').forEach(function(a){
				a.checked = false;
			})
		})

		document.querySelector(DOM.confDel).addEventListener('click',function(){
			document.querySelector(DOM.popBox).classList.toggle("displ");
			document.querySelector(DOM.pagecover).classList.toggle("displ");
			conformDelete();
		})
		document.addEventListener('keypress',function(event){
			if(event.keyCode === 13 || event.which === 13){
				addCntrlItem();
			};
		});

		listCntrl.localTOGet();
	};
	var viewForm = function(){
		UICntrl.clearFields();
		document.querySelector(DOM.addForm).classList.toggle("displ");
		document.querySelector(DOM.pagecover).classList.toggle("displ");
		document.querySelector(DOM.inputTittle).focus();
	};

	var addCntrlItem = function(){
		var newIemt,input;
		input = UICntrl.getInput();
		if(input.getName !=="" && input.getDate !=="" && input.getDetail !==""){

			 newIemt = listCntrl.addItem(input.getName,input.getDate,input.getDetail,input.getPrio,false);
			 // console.log(newIemt)
			 
			 UICntrl.addFromUI(newIemt);

			 viewForm()
			
			listCntrl.setLocal();

			// console.log(data)
		}
	};

	var completeEd = function(event){
		var itemId,id,splitID;

		if(event.target.id === "cheking"){
			var itemtit,itemdet;
				itemtit=event.target.parentNode.parentNode.parentNode.previousElementSibling.childNodes[3];
				itemdet=event.target.parentNode.parentNode.parentNode.previousElementSibling.childNodes[5];
				itemId = event.target.parentNode.parentNode.parentNode.parentNode.id;
				splitID = itemId.split('-')
				id =parseInt(splitID[1]);

				listCntrl.cmplfromList(id);
			itemtit.classList.toggle('fnStyle');
			itemdet.classList.toggle('fnStyle');
			listCntrl.setLocal();
		}

		editITEM(event);
	};
	var conformDelete = function(){
		var arr,itemId,
			
			arr = document.querySelectorAll('.deleteBtn')
			
			arr.forEach(function(cur){
				
				if(cur.checked){
				 	itemId = cur.parentNode.parentNode.parentNode.parentNode.id;
					//console.log(itemId);

					splitID = itemId.split('-')
					id =parseInt(splitID[1]);

					UICntrl.deleteItemFromUI(itemId);

					listCntrl.deletefromList(id);

					listCntrl.setLocal();
				}
			})
	}
	var editId,Event;
	var editITEM = function(event){
		var id,obj,dt;
		
		dt = listCntrl.getData().allItem
		 id = event.target.id;

		 	splitID = id.split('-');
			ID= parseInt(splitID[1]);
			ids = dt.map(function(curn){
				return curn.id;
			});
			
		 	Event = event;
			index = ids.indexOf(ID);

		 	editId = index;
			obj = dt[index];

		if(id.startsWith('editItem')){
			viewForm();	

			document.querySelector(DOM.inputTittle).value = obj.tittle;
			document.querySelector(DOM.inputDate).value = obj.date;
			document.querySelector(DOM.inputDetails).value = obj.detail;
			document.querySelector(DOM.inputPrio).value = obj.priority;

			btnDispl();
		}
	};
	var okEdit = function(){
		var newObj = listCntrl.editFromList(editId);
		viewForm();
		btnDispl();
		UICntrl.editFromUI(Event,newObj);
		listCntrl.setLocal();
	}
	var btnDispl = function(){
		document.querySelector(DOM.addBtn).classList.toggle("displ");
		document.querySelector(DOM.cancel).classList.toggle("displ");
		document.querySelector(DOM.okbtn).classList.toggle("displ");
	};
	var dataAddFromUI = function(newOBJ){
		document.querySelector(DOM.container).innerHTML = "";
		
		newOBJ.forEach(function(obj){
			UICntrl.addFromUI(obj);
		});

	};
	return {
		init : function(){
			setUpEventListener();

			dataAddFromUI(listCntrl.sortById());
		}
	}
})(listController,UIController);
// var app = appController(listController,UIController);
// app.init();
appController.init();