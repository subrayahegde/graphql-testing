const { RESTDataSource } = require("apollo-datasource-rest")
class CovidActNowAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = "https://api.covidactnow.org/v2/"
  }
  async getAllStates() {
    const response = await this.get(`states.json?apiKey=${process.env.COVID_ACT_NOW}`);    
    return response || [];
}async getState(stateCode) {
    const response = await this.get(
    `state/${stateCode}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW}`
    );
    return response;
}async getAllCounties() {
    const response = await this.get(`counties.json?apiKey=${process.env.COVID_ACT_NOW}`);    
    return response || [];
}async getCounty(fips) {
    const response = await this.get(
    `county/${fips}.timeseries.json?apiKey=${process.env.COVID_ACT_NOW}`
    );
    return response;
}

}
module.exports = CovidActNowAPI
