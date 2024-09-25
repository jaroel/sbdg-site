import {
  ArchiveBoxXMarkIcon,
  ArrowDownIcon,
  ArrowUpIcon,
  ArrowUpTrayIcon,
  CheckIcon,
  ChevronUpDownIcon,
  ClipboardDocumentIcon,
  DocumentIcon,
  PictureIcon,
  RectangleStackIcon,
  TableCellsIcon,
  XMarkIcon,
} from "~/components/Icons";
import { SidebarGunOnly } from "~/components/Sidebar";
import Toolbar from "~/components/Toolbar";

function Icons() {
  return (
    <>
      <table class="table-auto">
        <thead>
          <tr>
            <th>Name</th>
            <th>Example</th>
            <th>Used for</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>DocumentIcon</td>
            <td>
              <DocumentIcon title="DocumentIcon" />
            </td>
            <td>Text block</td>
          </tr>

          <tr>
            <td>RectangleStackIcon</td>
            <td>
              <RectangleStackIcon title="RectangleStackIcon" />
            </td>
            <td>Nested block block</td>
          </tr>

          <tr class="text-gray-400">
            <td>ArrowUpTrayIcon</td>
            <td>
              <ArrowUpTrayIcon title="ArrowUpTrayIcon" />
            </td>
            <td>[unused]</td>
          </tr>

          <tr>
            <td>ArchiveBoxXMarkIcon</td>
            <td>
              <ArchiveBoxXMarkIcon title="ArchiveBoxXMarkIcon" />
            </td>
            <td>Removing a block</td>
          </tr>

          <tr>
            <td>ArrowDownIcon</td>
            <td>
              <ArrowDownIcon title="ArrowDownIcon" />
            </td>
            <td>Moving a block down</td>
          </tr>

          <tr>
            <td>ArrowUpIcon</td>
            <td>
              <ArrowUpIcon title="ArrowUpIcon" />
            </td>
            <td>Moving a block up</td>
          </tr>

          <tr class="text-gray-400">
            <td>ClipboardDocumentIcon</td>
            <td>
              <ClipboardDocumentIcon title="ClipboardDocumentIcon" />
            </td>
            <td>[unused]</td>
          </tr>

          <tr>
            <td>PictureIcon</td>
            <td>
              <PictureIcon title="PictureIcon" />
            </td>
            <td>Image block</td>
          </tr>

          <tr>
            <td>CheckIcon</td>
            <td>
              <CheckIcon title="CheckIcon" />
            </td>
            <td>Selected icon in Select component</td>
          </tr>
          <tr>
            <td>ChevronUpDownIcon</td>
            <td>
              <ChevronUpDownIcon title="ChevronUpDownIcon" />
            </td>
            <td>Toggle icon in Select component</td>
          </tr>
          <tr>
            <td>XMarkIcon</td>
            <td>
              <XMarkIcon title="XMarkIcon" />
            </td>
            <td>Close icon in Dialog component</td>
          </tr>
          <tr>
            <td>TableCellsIcon</td>
            <td>
              <TableCellsIcon title="TableCellsIcon" />
            </td>
            <td>Table block</td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default function IconsView() {
  return (
    <>
      <Toolbar />
      <div>
        <div class="flex space-x-2 mx-2 my-4">
          <SidebarGunOnly />
          <main class="space-y-4 px-2 bg-white">
            <Icons />
          </main>
        </div>
      </div>
    </>
  );
}
