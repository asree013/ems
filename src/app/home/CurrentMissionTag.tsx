'use client'

import * as React from 'react';
import Box from '@mui/material/Box';

// import Stepper from '@mui/joy/Stepper';
import Step, { stepClasses } from '@mui/joy/Step';
import StepIndicator, { stepIndicatorClasses } from '@mui/joy/StepIndicator';

import styled from 'styled-components';

import CloseIcon from '@mui/icons-material/Close';
import { MissionTag } from '@/models/mission.model';
import { findMissionTagByMissionId } from '@/services/mission.service';
import { CurrentMissionContext, TCurrentMission } from '@/contexts/currentMission.context';
import { toast } from '@/services/alert.service';
import Stepper from '@mui/material/Stepper';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';


export default function CurrentMissionTah() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [missionTag, setMissionTag] = React.useState<MissionTag[]>({} as MissionTag[])
  const [load, setLoad] = React.useState<boolean>(false)
  const { missionUser } = React.useContext<TCurrentMission>(CurrentMissionContext)
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const Styled = styled.div`
    .gridMission{
      width: 100%;
    }
  @media only screen and (min-width: 350px) {
    .gridMission{
      display: grid;
      grid-template-columns: repeat(5, 2fr);
      grid-gap: 20px;
    }
  }
    @media only screen and (min-width: 1200px) {
    .gridMission{
      display: grid;
      grid-template-columns: repeat(8, 2fr);
      grid-gap: 20px;
    }
  }

`

  function totalSteps() {
    return missionTag.length;
  };

  function completedSteps() {
    return Object.keys(completed).length;
  };

  function isLastStep() {
    return activeStep === totalSteps() - 1;
  };

  function allStepsCompleted() {
    return completedSteps() === totalSteps();
  };

  function handleNext() {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        missionTag.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);

  };

  function handleBack() {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  function handleStep(step: number) {
    setActiveStep(step);
  };

  function handleComplete() {
    setCompleted({
      ...completed,
      [activeStep]: true,
    });
    handleNext();
  };

  function handleReset() {
    setActiveStep(0);
    setCompleted({});
  };

  const feedMissionTagByMissionId = React.useCallback(async () => {
    try {
      const result = await findMissionTagByMissionId(missionUser.id)
      setMissionTag(result.data)
      console.log('mission tag');

    } catch (error: any) {
      toast(error.message, 'error')
    }
  }, [setMissionTag, missionUser])

  React.useEffect(() => {
    if (!missionUser) {
      setLoad(true)
    }
    else {
      setLoad(false)
      feedMissionTagByMissionId()
    }

    return () => {
      feedMissionTagByMissionId
    }
  }, [feedMissionTagByMissionId])

  return (
    <Box >
      {/* <Stepper nonLinear activeStep={activeStep} sx={{width: '100%'}}>
        {
          missionTag.length >0 ?
          missionTag.map((label, index) => (
            <Step key={index} completed={completed[index]} >
              <StepButton color="inherit" onClick={() =>handleStep(index)} focusRipple={true}>
                {label.status}
              </StepButton>
            </Step>
          )):
          null
        }
      </Stepper> */}
      <Styled>
        <Stepper
          nonLinear
          activeStep={activeStep}
          className={'gridMission'}
          sx={{
            width: '100%',
            '--StepIndicator-size': '3rem',
            '--Step-connectorInset': '0px',
            [`& .${stepIndicatorClasses.root}`]: {
              borderWidth: 4,
            },
            [`& .${stepClasses.root}::after`]: {
              height: 4,
            },
            [`& .${stepClasses.completed}`]: {
              [`& .${stepIndicatorClasses.root}`]: {
                borderColor: 'green',
                color: 'green',
              },
              '&::after': {
                bgcolor: 'green',
              },
            },
            [`& .${stepClasses.active}`]: {
              [`& .${stepIndicatorClasses.root}`]: {
                borderColor: 'currentColor',
              },
            },
            [`& .${stepClasses.disabled} *`]: {
              color: 'neutral.outlinedDisabledColor',
            },
          }}

        >
          {
            missionTag.length > 0 ?
              missionTag.map((r, i) =>
                <Step
                  key={i}
                  completed
                  orientation="vertical"
                  indicator={
                    <StepIndicator variant="outlined" color="success">
                      {i + 1}
                    </StepIndicator>
                  }
                />
              ) :
              null
          }
          {/* <Step
            orientation="vertical"
            completed
            indicator={
              <StepIndicator variant="outlined" color="primary">
                2
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            completed
            indicator={
              <StepIndicator variant="outlined" color="primary">
                3
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            active
            indicator={
              <StepIndicator variant="solid" color="warning">
                <CreditCardRoundedIcon />
              </StepIndicator>
            }
          >
            <Typography
              sx={{
                textTransform: 'uppercase',
                fontWeight: 'lg',
                fontSize: '0.75rem',
                letterSpacing: '0.5px',
              }}
            >
              ปัจจุบัน
            </Typography>
          </Step>
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />

          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />

              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />

              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          />
          <Step
            orientation="vertical"
            disabled
            indicator={
              <StepIndicator variant="outlined" color="danger">
                <CloseIcon color='error' />
              </StepIndicator>
            }
          /> */}
        </Stepper>
      </Styled>

      {/* <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              สถาณะปัจจุบัน {activeStep + 1}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== missionTag.length &&
                (completed[activeStep] ? (
                  <Typography variant="caption" sx={{ display: 'inline-block' }}>
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : (
                  <Button onClick={handleComplete}>
                    {completedSteps() === totalSteps() - 1
                      ? 'Finish'
                      : 'Complete Step'}
                  </Button>
                ))}
            </Box>
          </React.Fragment>
        )}
      </div> */}
    </Box>
  );
}