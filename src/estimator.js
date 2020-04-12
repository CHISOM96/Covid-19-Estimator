const covid19ImpactEstimator = (data) => {
  const {
    // region,
    reportedCases,
    periodType,
    timeToElapse
    // totalHospitalBeds
  } = data;

  const dataToBeReturned = {
    data: {},
    impact: {},
    severeImpact: {}
  };
  dataToBeReturned.data = data;
  // Challenge 1


  // Infection rate

  const durationCheck = (period, duration) => {
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

  const totalDays = durationCheck(periodType, timeToElapse);
  const periodFactor = Math.floor(totalDays / 3);
  const infectionRate = 2 ** periodFactor;

  // impact
  const currentlyInfectedImpact = reportedCases * 10;
  const infectionsByRequestedTimeImpact = currentlyInfectedImpact * infectionRate;

  dataToBeReturned.impact.currentlyInfected = currentlyInfectedImpact;
  dataToBeReturned.impact.infectionsByRequestedTime = infectionsByRequestedTimeImpact;

  // severe impact
  const currentlyInfectedSevere = reportedCases * 50;
  const infectionsByRequestedTimeSevere = currentlyInfectedSevere * infectionRate;

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
};
export default covid19ImpactEstimator;
