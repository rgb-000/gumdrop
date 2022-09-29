import React from 'react';
import data from '../urls/urls.json';
import { Stack } from '@mui/material';
import { useWindowDimensions } from '../components/AppBar';

const dstr = data
  .filter(item => item.snapshot === 'last')
  .map(filtered => <>{filtered.date}</>);

const dstrs = dstr[0].props.children;
const time = dstrs.slice(4, 16);

export const About = () => {
  const summary = (
    <Stack spacing={1}>
      <div>
        ⚠️ Last balance update happened on <b>{time} UTC</b>. You can do the
        claim only once until the next update, which happens every monday, and
        the unclaimed balance acummulates from week to week.
      </div>
    </Stack>
  );

  const steps = [{ name: 'summary', inner: summary }];

  const maxWidth = 360;
  const { width } = useWindowDimensions();

  return (
    <Stack
      alignContent="left"
      textAlign="left"
      spacing={2}
      style={{
        margin: 'auto',
        maxWidth: Math.min(width, maxWidth),
      }}
    >
      {steps.map((s, idx) => (
        <div key={idx}>{s.inner}</div>
      ))}
    </Stack>
  );
};
