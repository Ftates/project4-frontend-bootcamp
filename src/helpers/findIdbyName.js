import React from "react";

export default function findIdByName(name, array) {
  const obj = array.find((element) => element.name === name);
  if (obj) {
    return obj.id;
  } else {
    return null;
  }
}
