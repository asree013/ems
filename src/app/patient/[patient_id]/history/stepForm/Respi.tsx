'use client'
import React from 'react'
import { PhysicalStatusContext, TPhysicalStatusContext } from '../StepContext';
import { Checkbox, Divider, FormControlLabel, FormGroup, MenuItem, TextField } from '@mui/material';
import { PhysicalStatus } from '@/models/historyDetail.model';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


const currencies = [
    {
        value: '0.5',
        label: '0.5',
    },
    {
        value: '1',
        label: '1',
    },
    {
        value: '1.5',
        label: '1.5',
    },
    {
        value: '2',
        label: '2',
    },
    {
        value: '2.5',
        label: '2.5',
    },
    {
        value: '3',
        label: '3',
    },
    {
        value: '3.5',
        label: '3.5',
    },
    {
        value: '4',
        label: '4',
    },
    {
        value: '4.5',
        label: '4.5',
    },
    {
        value: '5',
        label: '5',
    },
    {
        value: '5',
        label: '5.5',
    },
    {
        value: '6',
        label: '6',
    },
    {
        value: '6.5',
        label: '6.5',
    },
    {
        value: '7',
        label: '7',
    },
    {
        value: '7.5',
        label: '7.5',
    },
    {
        value: '8',
        label: '8',
    },
    {
        value: '8.5',
        label: '8.5',
    },
    {
        value: '9',
        label: '9',
    },
    {
        value: '9.5',
        label: '9.5',
    },
    {
        value: '10',
        label: '10',
    },
];

export default function Respi() {
    const { physicalStatus, setPhysicalStatus } = React.useContext<TPhysicalStatusContext>(PhysicalStatusContext);
    const [isNsf, setIsNsf] = React.useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const updatedStatus = {
            ...physicalStatus,
            respi: {
                ...physicalStatus.respi,
                [event.target.name.toLowerCase()]: event.target.checked,
            },
        };

        if (event.target.name === 'NSF' && physicalStatus?.airway?.nsf !== true) {
            setIsNsf(!isNsf);
            setPhysicalStatus({
                ...physicalStatus, respi: {
                    ...physicalStatus.respi, nsf: physicalStatus?.respi?.nsf ? !physicalStatus?.respi?.nsf : true, dyspnea: false, tachyypnea: false, wheezing: false
                }
            })
            console.log('nsf');


        }
        else {
            setPhysicalStatus({
                ...physicalStatus, respi: {
                    ...physicalStatus.respi, nsf: false, dyspnea: false, tachyypnea: false, wheezing: false, respi_checked: '', lmp: ''
                }
            })
            setIsNsf(false)
            setPhysicalStatus(updatedStatus);

        }

    };

    React.useEffect(() => {
        if (isNsf === true || physicalStatus?.respi?.nsf === true) {
            setPhysicalStatus({
                ...physicalStatus, respi: {
                    ...physicalStatus.respi, nsf: true, dyspnea: false, tachyypnea: false, wheezing: false, respi_checked: '', lmp: ''
                }
            })
            setIsNsf(true)

        }
        // else{
        //     setPhysicalStatus({
        //         ...physicalStatus, airway: {
        //             ...physicalStatus.airway, nsf: false
        //         }
        //     })
        //     setIsNsf(false)
        // }

    }, [setPhysicalStatus])

    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={physicalStatus?.respi?.nsf ? true : false}
                            onChange={handleChange}
                            name="NSF"
                        />
                    }
                    label="NSF"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={physicalStatus?.respi?.tachyypnea}
                            onChange={handleChange}
                            name="tachyypnea"
                            disabled={isNsf}
                        />
                    }
                    label="Tachyypnea"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={physicalStatus?.respi?.dyspnea}
                            onChange={handleChange}
                            name="dyspnea"
                            disabled={isNsf}
                        />
                    }
                    label="Dyspnea"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={physicalStatus?.respi?.wheezing}
                            onChange={handleChange}
                            name="wheezing"
                            disabled={isNsf}
                        />
                    }
                    label="Wheezing"
                />
            </FormGroup>
            <Divider />

            <FormControl disabled={isNsf}>
                <FormLabel id="demo-radio-buttons-group-label">Option</FormLabel>
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue=""
                    name="radio-buttons-group"
                    onChange={(e) => setPhysicalStatus({
                        ...physicalStatus, respi: {
                            ...physicalStatus.respi, respi_checked: e.target.value
                        }
                    })}
                    value={physicalStatus?.respi?.respi_checked ?? ''}
                >
                    <FormControlLabel value="o2_cannular" control={<Radio />} label="O2 Cannular" />
                    <FormControlLabel value="o2_mask" control={<Radio />} label="O2 Mask" />
                    <FormControlLabel value="collar_mask" control={<Radio />} label="Collar Mask" />
                    <FormControlLabel value="t-piece" control={<Radio />} label="T-piece" />
                </RadioGroup>
            </FormControl>
            <Divider />
            <div className='mt-3'>
                <TextField
                    disabled={isNsf}
                    id="outlined-select-currency"
                    select
                    label="LMP."
                    helperText="กรอกขนา LMP"
                    sx={{ width: '100%' }}
                    onChange={(e) => setPhysicalStatus({
                        ...physicalStatus, respi: {
                            ...physicalStatus.respi, lmp: e.target.value
                        }
                    })}
                    value={physicalStatus?.respi?.lmp?? null}

                >
                    {currencies.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
        </div>
    )
}
