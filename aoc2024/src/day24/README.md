# 🎄 Advent of Code 2024 - day 24 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/24)

## Notes

...

        x:111000011010110000101100011101101111011001101
        y:101111011010100100000110110101010100000011001
          ---------------------------------------------

right: 1100111110101010100110011010011000011011100110 (but not enough swaps, check z outputs manually for inconsistency)
wrong_3: 1101000110101010100110011010011000011011100110 (bit 39 wrong (carry over?? maybe from 15?))
wrong_2: 1101000110101010100101111010011000011011100110 (bit 23 wrong)
wrong_1: 1101000110101010100101111010011000011100100110 (bit 6 wrong)

switch dbp fdv (z06 is sus (wrong structure))
switch z23 and kdf (z23 is sus (wrong structure))
switch ckj and z15 (z15 is sus (very wrong structure))
switch rpp and z39 (z39 is sus (wrong structure))

z14 aaa XOR bbb
aaa y14 XOR x14
y14 undefined
x14 undefined
bbb ccc OR ddd
ccc y13 AND x13
y13 undefined
x13 undefined
ddd eee AND fff
eee y13 XOR x13
fff ggg OR hhh

z06 fdv XOR vjf  
 fdv y06 AND x06  
 y06 undefined  
 x06 undefined  
 vjf frt OR jwp  
 frt x05 AND y05  
 x05 undefined  
 y05 undefined  
 jwp dpb AND wgk  
 dpb ppf OR jmf
wgk y05 XOR x05

z15 x15 AND y15
x15 undefined
y15 undefined

z23 rqt OR rdt  
 rqt nsr AND gsd  
 nsr y23 XOR x23  
 y23 undefined  
 x23 undefined  
 gsd dqb OR dhv  
 dqb chk AND pjd
dhv x22 AND y22
rdt y23 AND x23  
 y23 undefined
x23 undefined

z39 vbt AND vqr  
 vbt ngh OR rfr  
 ngh y38 AND x38  
 y38 undefined  
 x38 undefined  
 rfr vbn AND vft  
 vbn ffp OR shb
vft x38 XOR y38
vqr y39 XOR x39  
 y39 undefined
x39 undefined
