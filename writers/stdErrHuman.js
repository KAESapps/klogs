module.exports = ({ name, time, diff, level, data }) =>
  console.error(
    `${new Date(time).toISOString()} ${name} ${level} ${data
      .map(JSON.stringify)
      .join(" ")} +${diff}ms`
  );
