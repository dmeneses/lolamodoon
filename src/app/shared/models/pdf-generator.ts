import { DietFood, DietSection } from "./diet";
import { Patient } from "./patient";

export class PdfGenerator {
  static generatePDF(sections: DietSection[], patient: Patient) {
    const modifiedWeight = +patient.weight * 2.20462;
    const maintenanceCalories = modifiedWeight * 10 * +patient.activityLevelMeasure;
    
    // Target calories
    let targetCalories = 0;
    if (patient.dietGoal === 'muscle-gain') {
      targetCalories = maintenanceCalories 
        + ((modifiedWeight * +patient.dietGoalPace * 3500) / 4 / 7);
    } else {
      targetCalories = maintenanceCalories 
        - (3500 * modifiedWeight * +patient.dietGoalPace) / (7 - +patient.refeedsPerWeek);
    }

    //BMR
    const basalMetabolicRate = (10 * +patient.weight) + (6.25 * +patient.height) - 5 * (+patient.age) 
      + (patient.gender === 'male' ? +5 : -161);
    
    return `
      <div class="header">
        <img class="logo" src="../../assets/images/lola-logo.jpeg"/>
        <div class="title">
          <h1 class="title-part-1">Lola Modo On</h1>
          <h3 class="title-part-2">Nutrición Integral</h3>
        </div>
      </div>
      <div class="patient-info">
        <h4 class="patient-data">
          Paciente: ${patient.name}<br/>
          Edad: ${patient.age} años<br/>
          Patologia: ${patient.pathology}
        </h4>
        <div class="legend">
          <div class="protein-row info-message">PROTEINA</div>
          <div class="carb-row info-message">CARBOHIDRATO</div>
          <div class="fat-row info-message">GRASA</div>
        </div>
      </div>
      <div class="totals">
        <table>
          <thead>
            <tr>
              <th>Metabolismo Basal</th>
              <th>Gasto de Energia Diario Estimado</th>
              <th>Calorias Según Meta</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${Math.round(basalMetabolicRate)}</td>
              <td>${Math.round(maintenanceCalories)}</td>
              <td>${Math.round(targetCalories)}</td>
            </tr>
          </tbody>
        </table>
      </div>


      <p class="carb-row info-message">Elegir un alimento de cada color, respetando las cantidades, en caso de elegir 2 carbohidratos toma la mitad de gramos de cada uno.</p>
      <p class="protein-row info-message">Las PROTEINAS se pesan en crudo, los carbohidratos tienes ambas opciones, crudo y cocido.</p>
      <p class="warn-row info-message">IMPORTANTE!! TANTO EL ALMUERZO COMO LA CENA INGRESAR 200 GRS DE VERDURAS EN CADA UNA.</p>


      <div>
        <table class="food-table">
        ${sections.reduce((tables, section, sectionIndex) => tables + `
          ${this.generateFoodTableHeader(section.name)}
          <tbody>
            ${section.foods.reduce((foodTable, food , index) => foodTable + `
            <tr class="${(food.food.type === 'protein') ? 'protein-row': 
                        (food.food.type === 'fat') ? 'fat-row' : 
                        (food.food.type === 'carbohydrate') ? 'carb-row' : 'warn-row' }">
              <td class="left-align">${food.food.name}</td>
              <td>${Math.round(food.servingSize)}</td>
              <td>${Math.round(food.protein)}</td>
              <td>${Math.round(food.carbohydrate)}</td>
              <td>${Math.round(food.fat)}</td>
              <td>${Math.round(food.fiber)}</td>
              <td>${Math.round(food.calories)}</td>
            </tr>
            ${section.foods.length === index + 1 && sectionIndex < sections.length - 1 ? '<tr class="separator"><td colspan="7"></td></tr>' : ''}
            `, '')}
          </tbody>
        `, '')}
        </table>
      </div>
    `
  }

  static generateFoodTableHeader(name: string) {
    return `
      <tr>
        <th colspan="7">${name}</th>
      </tr>
      <tr>
        <th>Alimento</th>
        <th>Cantidad (gr/ml)</th>
        <th>Proteína</th>
        <th>Carbohidrato</th>
        <th>Grasa</th>
        <th>Fibra</th>
        <th>Calorías</th>
      </tr>
    `
  }

  static generateStyles() {
    return `
    @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500&display=swap');
    @page { size: Letter landscape; }

    body {
      font-family: Roboto, "Helvetica Neue", sans-serif;
    }

    .header { 
      padding-bottom: 10px;
      overflow: auto;
    }
    .logo { width: 100px; float: left; }
    .title { padding-left: 10px; float: left; }
    .title-part-1 { margin-bottom: 0px }
    .title-part-2 { margin: 0px }

    .patient-info {
      overflow: auto;
      padding-bottom: 10px;
    }

    .patient-data {
      float: left;
    }

    .legend {
      float: right;
    }

    .totals {
      padding-bottom: 10px;
    }

    table, th, td {
      border: 1px solid black;
      border-collapse: collapse;
    }

    table {
      width: 100%;
    }

    td {
      text-align: right;
    }

    td.left-align {
      text-align: left;
    }
    
    tr.separator td {
      border: none;
      border-left: none;
      border-right: none;
      height: 40px;
    }

    .food-table {
      margin-bottom: 10px;
    }
    

    .protein-row {
      background-color: #B3CEFB;
    }

    .carb-row {
      background-color: #B5E3E8;
    }

    .fat-row {
      background-color: #BFBFBF;
    }

    .warn-row {
      background-color: #F7B4AE
    }

    .info-message {
      padding: 10px;
      border: 1px solid #000;
    }`
  }
}