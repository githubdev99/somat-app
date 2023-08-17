export const hexToRgba = (hex, opacity = "1") => {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return (
      "rgba(" +
      [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(",") +
      "," +
      opacity +
      ")"
    );
  }
  throw new Error("Bad Hex");
};

export const convertDate = (
  date,
  options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => date.toLocaleString("en-US", options);

export const convertDateWithTime = (
  date,
  options = {
    timeZone: "Asia/Jakarta",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }
) => date.toLocaleTimeString("en-US", options);

export const convertDateSqlFormat = (date) => {
  let getDate = new Date(date);

  return (
    getDate.getFullYear() +
    "-" +
    ("0" + (getDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + getDate.getDate()).slice(-2)
  );
};

export const arrayToCsv = (data) => {
  return data
    .map(
      (row) =>
        row
          .map(String) // convert every value to String
          .map((v) => v.replaceAll('"', '""')) // escape double colons
          .map((v) => `"${v}"`) // quote it
          .join(",") // comma-separated
    )
    .join("\r\n"); // rows starting on new lines
};

export const downloadBlob = (content, filename, contentType) => {
  // Create a blob
  var blob = new Blob([content], { type: contentType });
  var url = URL.createObjectURL(blob);

  // Create a link to download it
  var pom = document.createElement("a");
  pom.href = url;
  pom.setAttribute("download", filename);
  pom.click();
};

export const scrollToElement = (element) => {
  if (!element) return;

  var elementPosition = element.scrollHeight;
  window.scrollTo(0, elementPosition);
};
