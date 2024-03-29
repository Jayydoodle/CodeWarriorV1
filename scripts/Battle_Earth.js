/* Jason Allen 9/21/19 12:50 AM 

Script for the earth battle.  Most
likely will be incorporated into a
single Battle.js script
*/

var warriorObject = CacheHandler.getFromCache("warrior");
var mageObject = CacheHandler.getFromCache("mage");
var rangerObject = CacheHandler.getFromCache("ranger");
var inventoryObject = CacheHandler.getFromCache("inventory");

var party = new Party(warriorObject, mageObject, rangerObject, inventoryObject);

var sword = new Weapon("Rock Bow", "earth", "ranged", 100, false, "images/weapons/Crossbow.png");
var armor = new Armor("Earth Armor", "earth", "heavy", 100, false, "images/armor/Earth_Armor.png");
var earthStone = new Item("Earth Stone", "consumable", false, "images/crystals/Green_Crystal.jpg");
var potion = new Item("Potion", "consumable", true, "images/items/Yellow_Potion.png");
potion.setConsumeMessage("You used a " + potion.displayName);
var earthEnemy = new Enemy("ERYVEN", 300, sword, armor, [sword, armor, potion, earthStone]);

var currentEnemy = null;
var currentParty = null;
var partyIsAlive = true;
var bossIsAlive = true;
var battleStarted = false;

function battleEarth(){

    if(!partyIsAlive){
        return;
    }
    if(!bossIsAlive){
        return;
    }
    
    party = new BattleParty(warriorObject, mageObject, rangerObject, inventoryObject, earthEnemy);
    currentParty = party;
    currentEnemy = earthEnemy;
    battleStarted = true;

    var taskCompleted = false;
    
    party.warrior.debugPrintHeroStats();
    party.mage.debugPrintHeroStats();
    party.ranger.debugPrintHeroStats();
    console.log(" ");

    var cm = document.querySelector('.CodeMirror').CodeMirror;
    eval(cm.getValue()); // eval() pastes code from the user into this spot.
    console.log(" ");

    
    try {
        if(pillars <= 5)
            for(var i = 0; i < pillars; i++){
                
                console.log("Destroyed pillar " + (i + 1));
            }
        if(pillars == 5)
            taskCompleted = true;
        else if(pillars > 5)
            console.log("You destroyed too many pillars!  The cave starts to collapse!");
        else
            console.log("You did not destroy all of the pillars!  " + earthEnemy.name + " attacks!");
    } catch (error) {
        alert("You did not define the var pillars!  Try again.");
    }

    party.resetStates();
    document.getElementById("health").value = earthEnemy.hitpoints.toString();
    if(earthEnemy.hitpoints <= 0 && taskCompleted == true){
        win();
    }   
    else
        lose();
}
function attack(enemyName, heroType){
    party.attack(enemyName, heroType);
}
function changeWeapon(heroType, weaponName){
    party.changeWeapon(heroType, weaponName);
}
function changeArmor(heroType, armorName){
    party.changeArmor(heroType, armorName);
}
function showInventory(){
    if(!battleStarted)
        party.inventory.showInventory();
}
function hideInventory(){
    party.inventory.hideInventory();
}
function use(itemName){
    var usedItem = party.use("warrior", itemName);
}
function win(){

    bossIsAlive = false;

    var popup = document.getElementById("popup");
    document.getElementById("bossImage").src = "../images/enemies/EarthDragonDead.png";
    popup.innerHTML += "<h1 class='modalWin'>" + currentEnemy.displayName + " was defeated! </h1>";
    popup.innerHTML += "<h3 class='modalSubtext'>The following items were dropped: <h3>";
    drawTreasureBoxes(popup);

    currentParty.takeTreasure();
    CacheHandler.addToCache(currentParty.warrior, currentParty.mage, currentParty.ranger, currentParty.inventory);
    playOutcomeSound("sounds/Victory.mp3");
    showOverlay();
}
function lose(){

    partyIsAlive = false;

    var popup = document.getElementById("popup");
    
    popup.innerHTML += "<h1 class='modalLose'>GAME OVER</h1>";
    playOutcomeSound("sounds/Defeat.mp3");
    showOverlay();
}
function drawTreasureBoxes(popup){
    
    var treasureBoxClass;
    var firstImagePosition = 40;
    var offset = 30;

    if(currentEnemy.treasureChest.length > 3){
        treasureBoxClass = "treasureBoxSmall";
        offset = 15;
    }
    else
        treasureBoxClass = "treasureBox";

    for(var i = 0; i < currentEnemy.treasureChest.length; i++){
        
        if(i > 0){
            if(i % 2 != 0)
                firstImagePosition += offset * i;
            else
                firstImagePosition -= offset * i;
        }
        popup.innerHTML += "<div class="+treasureBoxClass+" style='left: "+firstImagePosition+"%;'>"
        +"<img class='inventoryImage' src="+currentEnemy.treasureChest[i].imageSource+"></div>";
    }
}
function showOverlay(){
    
    var textBox = document.getElementById("codeBox");
    textBox.style.pointerEvents = "none";
    $('.overlay').show();
}
function stateChange(){

    if(partyIsAlive && !bossIsAlive){
        window.location.href = "GameWorld.html";
    }
    else{
        window.location.reload();
    }
}
function viewLog(){
    $('.overlay').hide();
    var buttonContainer = document.getElementById("buttonContainer");
    buttonContainer.innerHTML = '<button class="centered" onclick="stateChange()">Continue</button>';
}
function playVictorySound(){
    document.getElementById("MusicPlayer").outerHTML = "";
    var musicPlayer = new MusicPlayer("sounds/Victory.mp3"); 
    musicPlayer.play();
}
function playOutcomeSound(outcomeSound){
    document.getElementById("MusicPlayer").outerHTML = "";
    var musicPlayer = new MusicPlayer(outcomeSound); 
    musicPlayer.play();
}