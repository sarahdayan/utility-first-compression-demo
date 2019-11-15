const fs = require("fs");
const crypto = require("crypto");

const source = fs.readFileSync("data/source.html", "utf-8");

const regex = /class="([\w-/: ]+)"/gm;

const dest = source.replace(regex, (_, group) => {
  const reordered = group
    .split(" ")
    .sort()
    .join(" ");
    
  const sha1 = crypto.createHash("sha1");
  const data = sha1.update(reordered, "utf-8");
  const hash = data.digest("hex");

  return `class="${hash.substr(0, 10)}"`;
});

fs.writeFileSync("data/dest.html", dest, "utf8");
