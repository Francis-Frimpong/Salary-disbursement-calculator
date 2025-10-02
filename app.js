class CallJsonData {
  constructor(data) {
    this.data = data;
  }
  async getJson() {
    const response = await axios.get(this.data);
    return response.data;
  }
}

class SDBCalculator {
  constructor() {
    this.tableBody = document.querySelector("tbody");
  }

  // create table dynamically
  createTableDate() {
    const getdata = new CallJsonData("/data.json");
    getdata.getJson().then((res) => {
      res.forEach((data) => {
        // console.log(`${data.name}: Gh${data.baseIncome}`);
        const tr = document.createElement("tr");

        // Name cell
        const nameTd = document.createElement("td");
        nameTd.textContent = data.name;

        // Base income cell
        const incomeTd = document.createElement("td");
        incomeTd.textContent = `Gh${data.baseIncome}`;

        // Input number cell
        const inputTd = document.createElement("td");
        const inputNumber = document.createElement("input");
        inputNumber.type = "number";
        inputNumber.placeholder = "Enter value";
        inputTd.appendChild(inputNumber);

        // Display balance cell
        const balanceTd = document.createElement("td");
        const inputText = document.createElement("input");
        inputText.type = "text";
        inputText.placeholder = "Display Balance";
        inputText.readOnly = true;
        balanceTd.appendChild(inputText);

        // Append all cells to row
        tr.appendChild(nameTd);
        tr.appendChild(incomeTd);
        tr.appendChild(inputTd);
        tr.appendChild(balanceTd);

        // Append row to tbody
        this.tableBody.appendChild(tr);
        this.calculateIncome(data.baseIncome, inputNumber, inputText);
      });
    });
  }

  // Caculate allocated Income
  calculateIncome(baseIncome, allocationField, balanceField) {
    allocationField.addEventListener("input", () => {
      let calculate = baseIncome - +allocationField.value;
      return (balanceField.value = calculate.toFixed(2));
    });
  }
}

const calculate = new SDBCalculator();
calculate.createTableDate();
