const covid19ImpactEstimator = (data) => {
  const {
    // region,
    reportedCases,
    periodType,
    timeToElapse
    // totalHospitalBeds
  } = data;
    // Challenge 1

  // Impact computation

  const impact = {
    currentlyInfected: reportedCases * 10
  };

  // Severe Impact

  const severeImpact = {
    currentlyInfected: reportedCases * 50
  };
    // Infection rate

  const durationCheck = (periodType, duration) => {
    let infectionRate = 2 ** Math.floor(duration / 3);
    if (periodType === 'weeks') {
      infectionRate = 2 ** Math.floor((duration * 7) / 3);
    } else if (periodType === 'months') {
      infectionRate = 2 ** Math.floor((duration * 30) / 3);
    }
    return infectionRate;
  };
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

  const getDuration = durationCheck(periodType, timeToElapse);

  impact.infectionsByRequestedtime = impact.currentlyInfected * getDuration;
  severeImpact.infectionsByRequestedtime = severeImpact.currentlyInfected * getDuration;
};
export default covid19ImpactEstimator;
