import sys,json,math
from pathlib import Path
sys.path.insert(0,'scripts')
from running_adjustment import *
# Analytic linear-slope case, duplicates, coverage rejection and out-of-range rejection.
assert abs(profile_cost_ratio([0,50,100],[0,5,10],0,100)-minetti_cost(.1)/3.6)<1e-12
assert abs(profile_cost_ratio([0,0,50,100],[0,999,5,10],0,100)-minetti_cost(.1)/3.6)<1e-12
for args in [([0,10],[0,0],0,100),([0,50],[0,50],0,50),([0,50,40],[0,0,0],0,40)]:
 try: profile_cost_ratio(*args)
 except ValueError: pass
 else: raise AssertionError('invalid profile accepted')
j=json.loads(Path('_data/running_profile_observations.json').read_text())
for r in j['observations']:
 laps=[Lap(**l,grade=0) for l in r['laps']]
 pace=adjusted_run_pace_s_per_mile(laps,r['weather']['swbgt_c'])
 assert abs(pace-r['pace_sec_per_mile'])<1e-8
 if len(laps)>1:assert abs(aerobic_decoupling_percent(laps)-r['decoupling_pct'])<1e-8
 assert max(r['sensitivity_paces'].values())-min(r['sensitivity_paces'].values())<4
 print(r['date'],round(pace),round(aerobic_efficiency_gain_index(round(pace),[743,741,744,755]),2))
print('Profile analytic, invalid-input and full observation recomputation checks passed')
