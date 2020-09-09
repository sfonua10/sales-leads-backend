const eligibleState = (eState) => {
  let isElibible = true;
  switch (eState) {
    case "Alaska":
    case "American Samoa":
    case "District of Columbia":
    case "Federated States of Micronesia":
    case "Guam":
    case "Marshall Islands":
    case "Hawaii":
    case "Northern Mariana Islands":
    case "Palau":
    case "Puerto Rico":
    case "Virgin Island":
      isElibible = false;
      break;
    default:
      isElibible = true;
  }

  return isElibible;
};

module.exports = { eligibleState }
