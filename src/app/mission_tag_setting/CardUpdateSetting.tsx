import * as React from 'react';
import Button from '@mui/joy/Button';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { MissionTagSetting } from '@/models/missionTagSetting.model';

type Props = {
  tagSetting: MissionTagSetting;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  returnUpdateTagSetting: (value: MissionTagSetting) => void;
};

export default function CardUpdateSetting({
  open,
  setOpen,
  tagSetting,
  returnUpdateTagSetting,
}: Props) {
  const [missionTagSetting, setMissionTagSetting] =
    React.useState<MissionTagSetting>(tagSetting);

  // อัปเดต state เมื่อ tagSetting เปลี่ยน
  React.useEffect(() => {
    setMissionTagSetting(tagSetting);
  }, [tagSetting]);

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        className="z-30"
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="outlined"
          sx={{ maxWidth: 500, borderRadius: 'md', p: 3, boxShadow: 'lg' }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            sx={{ fontWeight: 'lg', mb: 1 }}
          >
            แก้ไขแทก {tagSetting.label}
          </Typography>
          <div>
            <div>
              <label
                htmlFor="seq"
                className="text-blue-gd-from font-medium"
              >
                แทกที่
              </label>
              <input
                onChange={(e) =>
                  setMissionTagSetting({
                    ...missionTagSetting,
                    seq: Number(e.target.value),
                  })
                }
                type="number"
                className="w-full border border-gray-400 rounded-lg p-2"
                name="seq"
                value={missionTagSetting.seq}
                id="seq"
              />
            </div>
            <div className="mt-3">
              <label
                htmlFor="label"
                className="text-blue-gd-from font-medium"
              >
                ลักษณะภารกิจ
              </label>
              <textarea
                onChange={(e) =>
                  setMissionTagSetting({
                    ...missionTagSetting,
                    label: e.target.value,
                  })
                }
                className="w-full border border-gray-400 rounded-lg p-2"
                name="label"
                value={missionTagSetting.label}
                rows={3}
                id="label"
              />
            </div>
            <div className="mt-3 flex flex-row items-center justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="w-[80px] text-lg rounded-lg border border-gray-400 p-2 hover:bg-gray-100"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={() => returnUpdateTagSetting(missionTagSetting)}
                className="ml-3 w-[80px] font-medium hover:bg-blue-950 bg-blue-gd-from text-white p-2 text-lg rounded-lg"
              >
                แก้ไข
              </button>
            </div>
          </div>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
