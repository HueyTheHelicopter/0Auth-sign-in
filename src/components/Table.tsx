interface ItbodyData {
    row: string,
    index: number
}
export const JSONTable = ({ data }: any) => {

    function arrayOfValues(arr: any[]){
        let stringArray = ""
        
        arr.forEach((v, idx) => {
            if (v instanceof Object) {
                Object.values(v).map((data: any, i: any) => {
                    if (typeof(data) === 'string') {
                        switch(idx){
                            case 0: 
                                stringArray = stringArray.concat(data);
                                break;
                            default:
                                stringArray = stringArray.concat(', ', data);
                                break;
                        }
                    }
                })
            } else {
                switch(idx){
                    case 0: 
                        stringArray = stringArray.concat(v);
                        break;
                    default:
                        stringArray = stringArray.concat(', ', v);
                        break;
                }
            }
        });
        console.log(stringArray)
        return stringArray;
    }

    return (
      <table>
        <tbody>
          {Object.keys(data).map(key => (
            <tr key={key}>
              <tr>
                <td>{key}</td>
                <td>
                    {Object.keys(data[key]).map(value => 
                        <td key={value}>
                            {value}
                        </td>
                    )}
                </td>
              </tr>
              <tr>
                <td>
                    {Object.values(data[key]).map((value: [] | any, i: any) => {
                        if(Array.isArray(value)) {
                            return <td>{arrayOfValues(value)}</td>
                        } else {
                            return <td key={value}>
                                {value.toString()}
                            </td>
                        }
                        }
                    )}
                </td>
              </tr>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
