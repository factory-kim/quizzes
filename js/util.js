import { test_info, algorithm } from '../data/1/1_meta.js';
import { cover_page_info, questions } from '../data/1/1_test_kor.js';

export function getQuestions(test_id, language) {
    return questions
}

export function getCoverPageInfo(test_id, language) {
    return cover_page_info
}

export function getStartImagePath(test_id) {
    const path = `../res/${test_id}_start_image.jpg`
    return path
}

export function getTestMetaData(test_id) {
    //return eval(`${test_name}_test_info`)
    return test_info
}