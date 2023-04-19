function Equations({ text }: { text: string }) {
  let equationArr = [];
  const withoutArithmaticOperators = text.replace(/[()+*\/-]/g, ' ');
  const variables = withoutArithmaticOperators.match(/[^ ]+/g);
  let indexOfVariable = 0;

  for (let i = 0; i < text.length; i++) {
    switch (text.charAt(i)) {
    case '/':
    case '(':
    case ')':
    case '-':
    case '+':
    case '*':
      equationArr = [
        ...equationArr,
        {
          operator: true,
          text: text.charAt(i),
        },
      ];
      break;
    case ' ':
      break;
    default:
      if (
        /[()+*\/-]/g.test(text.charAt(i - 1)) ||
          text.charAt(i - 1) === ' ' ||
          i === 0
      ) {
        if (equationArr.indexOf(variables[indexOfVariable]) === -1) {
          equationArr = [
            ...equationArr,
            {
              operator: false,
              text: variables[indexOfVariable],
            },
          ];
          indexOfVariable += 1;
        }
      }

      break;
    }
  }

  return (
    <div className="my-2 flex flex-wrap justify-start items-center flex-1">
      {equationArr.map((str, i) => (
        <p
          className={
            !str.operator
              ? 'text-12 text-wfbase-800 font-normal py-1 px-3 m-1 rounded-full bg-wfbase-200'
              : ''
          }
          key={i}
        >
          {str.text}
        </p>
      ))}
    </div>
  );
}

export default Equations;
