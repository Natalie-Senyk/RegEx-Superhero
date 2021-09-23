const regExpData = [["abc123", 'boo200', 'tre876'], ["JavaScript2021", "happinessS4444", "gunningham2978"], ["ReactJS", 'reactTS', 'REACTRD'], ["5 sloths, 8 llamas", " sloths, llamas", "sloths,llamas" ], ["roaaaaaaar", "ROAAAAAAAR", "roaAAAaaaR"], ["abc-A", "ABC-a", "abca"], ["John Smith", "Johnny Smi", "john"], ["fee fi fo fum", "*** di do dum", "123 fi 22 ***"], ["192.168.1.", "192-168-1.", "192 168 1."], ["REACT-2021", "react-2021", "React 2021"], ["October 19 1991", "Oct-ber 19 91", "Oct 19 1991"], ["H E L L O World", "H.E.L.L.O W_o_r_l_d", "H*E*L*L*O World"], ["https://www.google.com/", "https://www.facebook.com/", "https://www.twitter.com/" ], ["rey, REY, Rey", "rey REY Rey", "rey_REY_Rey"  ], ["  *1spaceBeforeand2After  ", "*0spaceBeforeand0After", "  *1spaceBeforeand1After "], ["/333abc...", "/333abc", "/333abc---" ], ["The end 3-2-1", "Theend3-2-1", "Theend321" ], ["abcbcbcbc10", "abcbcbcbcAA", "10cbcbcbc10"], ["validemail@email.com", "validemail@email.ua", "validemail@email.uk"  ], ["1a2b3c2312321", "1a2b3c2 312321", "1a2 b3c2312 321" ], ["AZD_upper-The+", "azd_UPPER-The", "AZD_UPPER-THE+"], ["EnterYourRegExp", "Enteryourregexp*", "enyeryourregexpression"], ["EcmaScript2021-JS-Standards", "EcmaScript2021JSStandards", "EcmaScript-2021-JS-Standards"], ["-1, -2 We`re negative numbers", "1, 2 We`re positive numbers", "10, 20 We`re positive numbers"], ["Level9and5wordsleft", "level9and5wordsLEFT", "**Level9and5wordsleft"], ["+38063-040-78-52", "38063-040-7852", "+380630407852"], ["SPAM-12345-***", "SPAM_12345_***", "SPAM-12345-***"], ["guru999 1000 word1 word2 word3", "guru999 1000 word1word2word3", "guru9991000 word1 word2 word3*"], ["bbabbab BBA .Org", "bbabbab BbA org", "bbabbab BBA .Org123"], ["RegEx-SuperHero-2021", "RegExpSuperHero2021", "RegEx-SuperHERO-..2021.."],  ]


export default regExpData



//     { level: 1, words: ["abc123", "JavaScript2021", "ReactJS"] },
//     { level: 2, words: ["5 sloths, 8 llamas, 7 hyenas", "roaaaaaaar", "abc-A"] },
//     { level: 3, words: ["John Smith", "fee fi fo fum", "192.168.1."] },
//     { level: 4, words: ["REACT-2021", "October 19 1991", "H E L L O World"] },
//     {
//       level: 5,
//       words: [
//         "https://www.google.com/",
//         "rey, REY, Rey",
//         "  *1spaceBeforeand2After  ",
//       ],
//     },
//     { level: 6, words: ["/333abc...", "The end 3-2-1", "abcbcbcbc10"] },
//     {
//       level: 7,
//       words: ["validemail@email.com", "1a2b3c2312321", "AZD_upper-The+"],
//     },
//     {
//       level: 8,
//       words: [
//         "EnterYourRegExp",
//         "EcmaScript2021-JS-Standards",
//         "-1, -2 Were negative numbers"
//       ],
//     },
//     {
//       level: 9,
//       words: ["Level9and5wordsleft", "+38063-040-78-52", "SPAM-12345-***"],
//     },
//     {
//       level: 10,
//       words: [
//         "guru999 1000 word1 word2 word3",
//         "bbabbab BBA .Org",
//         "RegEx-SuperHero-2021",
//       ],
//     },
// ]


// const regExpData = [["abc123", 'boo200', 'tre876'], ["JavaScript2021", "happinessS4444", "gunningham2978"], ["ReactJS", 'reactTS', 'REACTRD'], ["5 sloths, 8 llamas", " sloths, llamas", "sloths,llamas" ], ["roaaaaaaar", "abc-A", "John Smith", "fee fi fo fum", "192.168.1.", "REACT-2021", "October 19 1991", "H E L L O World", "https://www.google.com/", "rey, REY, Rey", "  *1spaceBeforeand2After  ", "/333abc...", "The end 3-2-1", "abcbcbcbc10", "validemail@email.com", "1a2b3c2312321", "AZD_upper-The+", "EnterYourRegExp", "EcmaScript2021-JS-Standards", "-1, -2 We`re negative numbers", "Level9and5wordsleft", "+38063-040-78-52", "SPAM-12345-***", "guru999 1000 word1 word2 word3", "bbabbab BBA .Org", "RegEx-SuperHero-2021" ] 
