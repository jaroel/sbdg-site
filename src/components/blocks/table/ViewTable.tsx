import type { TableBlock } from "../schemas";

export default function ViewTableBlock(props: {
  object: TableBlock;
}) {
  const content = () => {
    const head = props.object.content[0];
    const tail = props.object.content.slice(1);
    if (head && tail.length) {
      return { head, tail };
    }
  };

  return (
    <div class="bg-white">
      {content() && (
        <table class="min-w-full divide-y divide-gray-300">
          <caption class="text-left text-xl text-gray-600">
            {props.object.label}
          </caption>

          <thead>
            <tr>
              {content()?.head.map((value) => (
                <th
                  scope="col"
                  class="px-1 py-2 text-left text-sm font-semibold text-gray-900"
                >
                  {value}
                </th>
              ))}
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            {content()?.tail.map((line) => (
              <tr>
                {line.map((value) => (
                  <td class="whitespace-nowrap px-1 py-1 text-sm text-gray-500">
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
