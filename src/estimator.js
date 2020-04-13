// Infection rate

const durationCheck = (periodType, duration) => {
  if (periodType === 'days') {
    return duration;
  }
  if (periodType === 'weeks') {
    return duration * 7;
  }
  if (periodType === 'months') {
    return duration * 30;
  }
  return duration;
};

const covid19ImpactEstimator = (data) => {
  const {
    region,
    reportedCases,
    periodType,
    timeToElapse,
    totalHospitalBeds
  } = data;


  // Challenge 1


  const totalDays = durationCheck(periodType, timeToElapse);
  const periodFactor = Math.floor(totalDays / 3);
  const infectionRate = 2 ** periodFactor;

  const dataToBeReturned = {
    data: {},
    impact: {},
    severeImpact: {}
  };
  dataToBeReturned.data = data;

  // impact
  const currentlyInfectedImpact = reportedCases * 10;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * infectionRate;

  // severe impact
  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * infectionRate;


  // data to be returned for challenge 1
  dataToBeReturned.impact.currentlyInfected = currentlyInfectedImpact;
  dataToBeReturned.impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;
  dataToBeReturned.severeImpact.currentlyInfected = currentlyInfectedSevere;
  dataToBeReturned.severeImpact.infectionsByRequestedTime = infectionsByRequestedTimeSevere;


  /* const durationCheck = (periodType, duration) => {
                                  let infectionRate = Math.pow(2, Math.floor(duration / 3));
                                  if (periodType === 'weeks') {
                                      infectionRate = Math.pow(2, Math.floor(duration * 7 / 3));
                                  } else if (periodType === 'months') {
                                      infectionRate = Math.pow(2, Math.floor(duration * 30 / 3));
                                  }
                                  return infectionRate;
                                  };
                                  This also works */


  // impact.infectionsByRequestedtime = impact.currentlyInfected * infectionRate;
  // severeImpact.infectionsByRequestedtime = severeImpact.currentlyInfected * infectionRate;

  // challenge 2
  const { impact, severeImpact } = dataToBeReturned;

  const averageBedsOccupied = Math.floor(totalHospitalBeds * 0.65);
  const averageAvialableBeds = totalHospitalBeds - averageBedsOccupied;
  // impact (challenge 2)
  const severeCasesByReqTimeImpact = Math.floor(impact.infectionsByRequestedTime * 0.15);
  const hospitalBedsByReqTimeImpact = averageAvialableBeds - severeCasesByReqTimeImpact;

  // severe impact (challenge 2)
  const severeCasesByReqTimeSevere = Math.floor(severeImpact.infectionsByRequestedTime * 0.15);
  const hospitalBedByReqTimeSevere = averageAvialableBeds - severeCasesByReqTimeSevere;

  // data to be returned for challenge 2
  dataToBeReturned.impact.severeCasesByRequestedTime = severeCasesByReqTimeImpact;
  dataToBeReturned.impact.hospitalBedsByRequestedTime = hospitalBedsByReqTimeImpact;
  dataToBeReturned.severeImpact.severeCasesByRequestedTime = severeCasesByReqTimeSevere;
  dataToBeReturned.severeImpact.hospitalBedsByRequestedTime = hospitalBedByReqTimeSevere;
  // challenge 3
  const dailyIncome = region.avgDailyIncomeInUSD;
  const incomePopulation = region.avgDailyIncomePopulation;
  // impact
  const casesForICUByReqTimeImpact = Math.floor(impact.infectionsByRequestedTime * 0.05);
  const casesForVentByReqTimeImpact = Math.floor(impact.infectionsByRequestedTime * 0.02);

  // income
  const infectedWithIncomeImpact = infectionsByRequestedTimeImpact * incomePopulation;
  const dollarsInFlightImpact = Math.floor(infectedWithIncomeImpact * dailyIncome);

  // data to be returned impact
  dataToBeReturned.impact.casesForICUByRequestedTime = casesForICUByReqTimeImpact;
  dataToBeReturned.impact.casesForVentilatorsByRequestedTime = casesForVentByReqTimeImpact;
  dataToBeReturned.impact.dollarsInFlight = dollarsInFlightImpact;

  // severe impact
  const casesForICUByReqTimeSevere = Math.floor(severeImpact.infectionsByRequestedTime * 0.05);
  const casesForVentByReqTimeSevere = Math.floor(severeImpact.infectionsByRequestedTime * 0.02);

  // income
  const infectedWithIncomeSevere = infectionsByRequestedTimeSevere * incomePopulation;
  const dollarsInFlightSevere = Math.floor(infectedWithIncomeSevere * dailyIncome);

  // data to be returned impact
  dataToBeReturned.severeImpact.casesForICUByRequestedTime = casesForICUByReqTimeSevere;
  dataToBeReturned.severeImpact.casesForVentilatorsByRequestedTime = casesForVentByReqTimeSevere;
  dataToBeReturned.severeImpact.dollarsInFlight = dollarsInFlightSevere;


  return dataToBeReturned;
};
export default covid19ImpactEstimator;
