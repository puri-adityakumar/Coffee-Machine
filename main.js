// Import the `sync-input` library, which allows us to read user input from the console synchronously
const input = require("sync-input");

// Create an object representing the state of the coffee machine, with various properties such as the amount of water, milk, sugar, coffee beans, disposable cups, and cash on hand
const coffeeMachine = {
    waterAmount: 400,
    milkAmount: 540,
    sugarAmount: 80,
    coffeeBeanAmount: 120,
    cups: 9,
    cash: 550,
};

// Set the cost and amount of sugar for each serving of coffee
const sugarCostPerServing = 0.5;
const gramsOfSugarPerServing = 4;

// Define an array of coffee types, each represented as an object with properties for the name of the coffee, the amount of water, milk, and coffee beans required, and the cost
const coffeeTypes = [
    {name: "espresso", water: 250, milk: 0, coffee: 16, cost: 4},
    {name: "latte", water: 350, milk: 75, coffee: 20, cost: 7},
    {name: "cappuccino", water: 200, milk: 100, coffee: 12, cost: 6},
];

// Define a function that prints the current status of the coffee machine to the console
function coffeeMachineStatus() {
    console.log("The coffee machine has:");
    console.log(`${coffeeMachine.waterAmount} ml of water`);
    console.log(`${coffeeMachine.milkAmount} ml of milk`);
    console.log(`${coffeeMachine.sugarAmount} g of sugar`);
    console.log(`${coffeeMachine.coffeeBeanAmount} g of coffee beans`);
    console.log(`${coffeeMachine.cups} disposable cups`);
    console.log(`$${coffeeMachine.cash} of money`);
    console.log();
}
// This function checks if there are enough supplies to make a cup of coffee of the given type and with the given amount of sugar.
function checkSupplies(coffeeType, sugarAmount) {
    if (coffeeMachine.cups - 1 < 0) { // Check if there are enough cups.
        console.log("Sorry, not enough cups!");
        return false;
    } else if (coffeeMachine.waterAmount - coffeeTypes[coffeeType].water < 0) { // Check if there is enough water.
        console.log("Sorry, not enough water!");
        return false;
    } else if (coffeeMachine.milkAmount - coffeeTypes[coffeeType].milk < 0) { // Check if there is enough milk.
        console.log("Sorry, not enough milk!");
        return false;
    } else if (coffeeMachine.sugarAmount - sugarAmount < 0) { // Check if there is enough sugar.
        console.log("Sorry, not enough sugar!");
        return false;
    } else if (coffeeMachine.coffeeBeanAmount - coffeeTypes[coffeeType].coffee < 0) { // Check if there are enough coffee beans.
        console.log("Sorry, not enough coffee!");
        return false;
    } else {
        return true;
    }
}

// This function brews a cup of coffee of the given type and with the given amount of sugar.
function brewCoffee(coffeeType, servingsOfSugar) {
    const sugarAmount = servingsOfSugar * gramsOfSugarPerServing;
    if (checkSupplies(coffeeType, sugarAmount)) { // Check if there are enough supplies to make the coffee.
        console.log("I have enough resources, making you a coffee!");
        coffeeMachine.waterAmount -= coffeeTypes[coffeeType].water;
        coffeeMachine.milkAmount -= coffeeTypes[coffeeType].milk;
        coffeeMachine.sugarAmount -= sugarAmount;
        coffeeMachine.coffeeBeanAmount -= coffeeTypes[coffeeType].coffee;
        coffeeMachine.cups -= 1;
        coffeeMachine.cash += coffeeTypes[coffeeType].cost; // Add the cost of the coffee to the machine's cash.
        coffeeMachine.cash += servingsOfSugar * sugarCostPerServing; // Add the cost of the sugar to the machine's cash.
    }
    console.log();
}

// This function lets the user buy a cup of coffee.
function buyCoffee() {
    console.log("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino, back - to main menu:");
    const coffeeType = input();
    if (coffeeType === "back") { // If the user types "back", go back to the main menu.
        console.log();
        return;
    }
    console.log("Would you like to add sugar (y/n)?");
    const response = input();
    let servingsOfSugar = 0;
    if (response.toLowerCase() === "y") { // If the user types "y", ask how many servings of sugar they want to add.
        console.log(`How many servings of sugar? (${gramsOfSugarPerServing}g per serving)`)
        servingsOfSugar = Number(input())
    }
    brewCoffee(Number(coffeeType) - 1, servingsOfSugar); // Brew the coffee with the given type and amount of sugar.
    console.log();
}

function fillMachine() {
    // Prompt the user to input the amount of water, milk, sugar, coffee, and disposable cups to add
    console.log("Write how many ml of water you want to add:");
    const water = Number(input());
    console.log("Write how many ml of milk you want to add:");
    const milk = Number(input());
    console.log("Write how many grams of sugar you want to add:");
    const sugar = Number(input());
    console.log("Write how many grams of coffee beans you want to add:");
    const coffee = Number(input());
    console.log("Write how many disposable coffee cups you want to add:");
    const cups = Number(input());

    // Add the amounts specified by the user to the coffee machine
    coffeeMachine.waterAmount += water;
    coffeeMachine.milkAmount += milk;
    coffeeMachine.sugarAmount += sugar;
    coffeeMachine.coffeeBeanAmount += coffee;
    coffeeMachine.cups += cups;
    console.log();
}

function takeCash() {
    // Output the amount of cash in the coffee machine, then reset the cash to 0
    console.log(`I gave you $${coffeeMachine.cash}`);
    coffeeMachine.cash = 0;
    console.log();
}

// Create a loop that will run until the user chooses to exit
let exit = false;
do {
    // Prompt the user to choose an action to perform
    console.log("Write action (buy, fill, take, remaining, exit):");
    const action = input();
    console.log();

    // Use a switch statement to determine which action to perform based on the user's input
    switch (action) {
        case "buy":
            buyCoffee();
            break;
        case "fill":
            fillMachine();
            break;
        case "take":
            takeCash();
            break;
        case "remaining":
            coffeeMachineStatus();
            break;
        case "exit":
            exit = true;
            break;
        default:
            console.log(`Invalid choice: ${action}`);
            break;
    }
// Repeat the loop until the user chooses to exit
} while (!exit);
