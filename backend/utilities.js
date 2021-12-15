import axios from 'axios';

/*
async function that returns object matching SongSearch schema 
    songImage: URL of image
    wordCounts: array matching structure needed for react word cloud element here
    https://www.npmjs.com/package/react-wordcloud

returns null if invalid search
 */
async function getWordCloud(artist, song) {
  var request = await axios.get(
    'http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=' +
      artist +
      '&song=' +
      song
  );
  var to_return = {};
  if (request.status != 200) {
    return null;
  } else {
    let artist_split = request.data.split('LyricArtist>');
    let artistName;
    if (artist_split.length == 1) {
      artistName = null;
    } else {
      artistName = artist_split[1].slice(0, -2);
    }

    let song_split = request.data.split('LyricSong>');
    let songName;
    if (song_split.length == 1) {
      songName = null;
    } else {
      songName = song_split[1].slice(0, -2);
    }

    let songId_split = request.data.split('LyricId>');
    let songId;
    if (songId_split.length == 1) {
      songId = null;
    } else {
      songId = songId_split[1].slice(0, -2);
    }

    let image_split = request.data.split('LyricCovertArtUrl>');
    let image_url;
    if (image_split.length == 1) {
      image_url = "https://files.radio.co/humorous-skink/staging/default-artwork.png"
    } else {
      image_url = image_split[1].slice(0, -2);
    }
    let lyric_split = request.data.split('Lyric>');

    //return null if no lyrics
    if (lyric_split.length <= 1) {
      return null;
    }

    let lyric_string = lyric_split[1].slice(0, -2);

    lyric_string = lyric_string
      .replace(/[.,\/#!$?%\^&\*;:{}=\-_`~()]/g, '')
      .toLowerCase();
    let word_map = await getWordCount(lyric_string);

    to_return.artistName = artistName;
    to_return.imageUrl = image_url;
    to_return.songId = songId;
    to_return.songName = songName;
    to_return.wordCounts = word_map;
    return to_return;
  }
}

async function getWordCount(lyric) {
  const stopwords = [
    'i',
    'me',
    "'",
    '',
    'my',
    'myself',
    'we',
    'our',
    'ours',
    'ourselves',
    'you',
    'your',
    'yours',
    'yourself',
    'yourselves',
    'he',
    'him',
    'his',
    'himself',
    'she',
    'her',
    'hers',
    'herself',
    'it',
    'its',
    'itself',
    'they',
    'them',
    'their',
    'theirs',
    'themselves',
    'what',
    'which',
    'who',
    'whom',
    'this',
    'that',
    'these',
    'those',
    'am',
    'is',
    'are',
    'was',
    'were',
    'be',
    'been',
    'being',
    'have',
    'has',
    'had',
    'having',
    'do',
    'does',
    'did',
    'doing',
    'a',
    'an',
    'the',
    'and',
    'but',
    'if',
    'or',
    'because',
    'as',
    'until',
    'while',
    'of',
    'at',
    'by',
    'for',
    'with',
    'about',
    'against',
    'between',
    'into',
    'through',
    'during',
    'before',
    'after',
    'above',
    'below',
    'to',
    'from',
    'up',
    'down',
    'in',
    'out',
    'on',
    'off',
    'over',
    'under',
    'again',
    'further',
    'then',
    'once',
    'here',
    'there',
    'when',
    'where',
    'why',
    'how',
    'all',
    'any',
    'both',
    'each',
    'few',
    'more',
    'most',
    'other',
    'some',
    'such',
    'no',
    'nor',
    'not',
    'only',
    'own',
    'same',
    'so',
    'than',
    'too',
    'very',
    's',
    't',
    'can',
    'will',
    'just',
    'don',
    'should',
    'now',
  ];
  lyric = lyric.replace(/[.,\/#!$?%\^&\*;:{}="\r\_`~()]/g, '');
  let lyric_split = lyric.split(/[\n ]/g);

  let map = new Map();
  for (let i = 0; i < lyric_split.length; ++i) {
    let curr_word = lyric_split[i];
    if (map.has(curr_word)) {
      map.set(curr_word, map.get(curr_word) + 1);
    } else {
      if (!stopwords.includes(curr_word)) {
        map.set(curr_word, 1);
      }
    }
  }
  let map_list = [];

  for (let [key, value] of map) {
    let pair = {};
    pair.text = key;
    pair.value = value;
    map_list.push(pair);
  }
  return map_list;
}

export { getWordCloud };
