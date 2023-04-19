import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { SheetAction } from 'src/report/content.styles';
import { colors } from 'src/theme';

type ReportCardProps = {
  id: string;
  display_name: string;
  description: string;
  numberOfSheet: number;
  numberOfSchedule: number;
  numberOfEmails: number;
};

const Card = styled(Box)(({ theme }) => ({
  '& .card-left': {
    '& h5': {
      fontWeight: 700,
      lineHeight: '34px',
      marginBottom: theme.spacing(1),
    },
    color: colors.wfBase[800],
    flex: 1,
    padding: theme.spacing(3),
  },
  '& .card-right': {
    '& .infos': {
      '& .info-line': {
        alignItems: 'center',
        color: colors.wfBase[600],
        display: 'flex',
        gap: theme.spacing(),
      },
      display: 'flex',
      flexDirection: 'column',
      gap: theme.spacing(),
    },
    alignItems: 'center',
    background: colors.wfBase[100],
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing(2)} ${theme.spacing(3)}`,
    width: 275,
  },
  background: '#fff',
  borderRadius: theme.spacing(2),
  boxShadow: '0px 6px 14px rgba(0, 0, 0, 0.08)',
  display: 'flex',
  justifyContent: 'space-between',
  overflow: 'hidden',
}));

function ReportCard({
  id,
  display_name,
  description,
  numberOfSheet,
  numberOfSchedule,
  numberOfEmails,
}: ReportCardProps) {
  const router = useRouter();

  const onViewReport = () => {
    router.push(`/dashboard/report/${id}`);
  };

  return (
    <Card mb={2} onClick={onViewReport} sx={{ cursor: 'pointer' }}>
      <div className="card-left">
        <Typography variant="h5">{display_name}</Typography>
        <Typography>{description}</Typography>
      </div>
      <div className="card-right">
        {/* <div className="infos">
                    <div className="info-line">
                        <Image src="/icons/window.svg" width={16} height={16} />
                        <Typography>{numberOfSheet} sheet</Typography>
                    </div>
                    <div className="info-line">
                        <Image src="/icons/icon-calendar.svg" width={16} height={16} />
                        <Typography>
                            {numberOfSchedule === 0
                                ? 'No schedule'
                                : `${numberOfSchedule} scheulde`}
                        </Typography>
                    </div>
                    <div className="info-line">
                        <Image src="/icons/icon-mail.svg" width={16} height={16} />
                        <Typography>
                            {numberOfEmails === 0
                                ? 'No emails added'
                                : `${numberOfEmails} emails`}
                        </Typography>
                    </div>
                </div> */}
        <SheetAction>
          {/* <CSVLink
                                data={
                                    data.data.data.sheets[0].records
                                        ? data.data.data.sheets[0].records
                                        : [{}]
                                }
                                filename={`${data.data.data.display_name
                                    .toLowerCase()
                                    .replace(/\s/g, '')}_${sheets[0].name}.csv`}
                                target="_blank"
                            > */}
          <IosShareIcon /> Export
        </SheetAction>
        <IconButton
          aria-label="view"
          onClick={onViewReport}
          sx={{ color: colors.wfBase[800] }}
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
    </Card>
  );
}

export default ReportCard;
