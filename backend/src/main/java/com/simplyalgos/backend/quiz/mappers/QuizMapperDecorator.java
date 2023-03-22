package com.simplyalgos.backend.quiz.mappers;

import com.simplyalgos.backend.quiz.domains.*;
import com.simplyalgos.backend.quiz.dtos.QuizDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionAnswerDTO;
import com.simplyalgos.backend.quiz.dtos.QuizQuestionDTO;
import com.simplyalgos.backend.quiz.dtos.TakeQuizDTO;
import com.simplyalgos.backend.quiz.dtos.TakenQuizzesDashboardDTO;
import com.simplyalgos.backend.user.mappers.UserMapper;
import com.simplyalgos.backend.user.mappers.UserMapperDecorator;
import io.swagger.v3.core.util.Json;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import java.util.Collections;
import java.util.*;

@Slf4j
@RequiredArgsConstructor
public class QuizMapperDecorator implements QuizMapper{

    private QuizMapper quizMapper;

    private UserMapper userMapper = new UserMapperDecorator();
    @Override
    public QuizDTO quizToQuizDTO(Quiz quiz) {
        return quizMapper.quizToQuizDTO(quiz);
    }

    @Override
    public TakeQuizDTO takeQuizToTakeQuizDTO(TakeQuiz takeQuiz) {
        return quizMapper.takeQuizToTakeQuizDTO(takeQuiz);
    }

    @Override
    public Set<QuestionAnswer> quizQuestionAnswerDTOToQuestionAnswer(Set<QuizQuestionAnswerDTO> quizQuestionAnswerDTOList) {
        return quizMapper.quizQuestionAnswerDTOToQuestionAnswer(quizQuestionAnswerDTOList);
    }

    @Override
    public List<QuizQuestion> quizQuestionDTOToQuizQuestion(List<QuizQuestionDTO> quizQuestionDTO) {
        log.debug("quizQuestionDTO Size: " +  Json.pretty(quizQuestionDTO));
        List<QuizQuestion> quizQuestionList = quizMapper.quizQuestionDTOToQuizQuestion(quizQuestionDTO);
        for(int i = 0; i < quizQuestionList.size(); i++){
            quizQuestionList.get(i).setAnswerChoices(
            quizMapper.quizQuestionAnswerDTOToQuestionAnswer(
                    quizQuestionDTO.get(i).getAnswers()
            ));
        }
        return quizQuestionList;
    }

    @Override
    public List<TakeQuizDTO> takeQuizToTakeQuizDTO(List<TakeQuiz> takeQuizList) {
        log.debug("inside takeQuiz to takeQuiz dto");
        return quizMapper.takeQuizToTakeQuizDTO(takeQuizList) ;
    }

    @Override
    public List<TakeQuiz> takeQuizDTOToTakeQuiz(List<TakeQuizDTO> takeQuizDTOList) {
        return quizMapper.takeQuizDTOToTakeQuiz(takeQuizDTOList);
    }

    @Override
    public List<TakenQuizzesDashboardDTO> takeQuizToTakenQuizzesDashboardDTO(List<TakeQuiz> takeQuizList) {
        List<List<Double>> scoreRecord = new ArrayList<>();
        List<List<Integer>> timeRecord = new ArrayList<>();
        Map<UUID, Integer> quizIdAndIndex = new HashMap<>();
//        will return takenQuizzesDashboardDTOList
        List<TakenQuizzesDashboardDTO> takenQuizzesDashboardDTOList = new ArrayList<>();
        int mainIndex = 0;
        log.debug("compacting takeQuiz");
        for(int i = 0; i < takeQuizList.size(); i++){
            UUID checkId = takeQuizList.get(i).getQuizReference().getQuizId();
            //the quiz has not been seen before
            //will create a new List for it
            if(!quizIdAndIndex.containsKey(checkId)){
                quizIdAndIndex.put(checkId, mainIndex);
                scoreRecord.add(mainIndex, new ArrayList<>());
                scoreRecord.get(mainIndex).add(takeQuizList.get(i).getScore());
                timeRecord.add(mainIndex, new ArrayList<>());
                timeRecord.get(mainIndex).add(getTimeDiff(takeQuizList.get(i)));
                takenQuizzesDashboardDTOList.add(mainIndex, TakenQuizzesDashboardDTO.builder()
                        .quizDTO(quizMapper.quizToQuizDTO(takeQuizList.get(i).getQuizReference()))
                        .createdBy(userMapper.userTOUserDataDTO(takeQuizList
                                .get(i).getQuizReference().getCreatedBy()))
                        .attempts(1)
                        .userId(takeQuizList.get(i).getTakenBy().getUserId())
                        .build());
                ++mainIndex;
            }
            //the quiz is seen and has an index
            //will be adding to existing list index
            else{
                //here will be adding to scoreRecord / timeRecord to later calculate the average
                scoreRecord.get(quizIdAndIndex.get(checkId)).add(takeQuizList.get(i).getScore());
                timeRecord.get(quizIdAndIndex.get(checkId)).add(getTimeDiff(takeQuizList.get(i)));
            }
        }

        //will have same size
        //sorting user score / time
        log.debug("sorting the score & time records");
        for(int i = 0; i < scoreRecord.size(); i++){
            Collections.sort(scoreRecord.get(i));
            Collections.sort(timeRecord.get(i));
        }
        log.debug("Calculating the score & time records");
        mainIndex = 0;
        for(TakenQuizzesDashboardDTO valueSetter : takenQuizzesDashboardDTOList){
            int tempSize = scoreRecord.get(mainIndex).size();
            valueSetter.setHighestScore(scoreRecord.get(mainIndex).get(tempSize-1));
            valueSetter.setLowestSore(scoreRecord.get(mainIndex).get(0));

            valueSetter.setWorstTime(timeRecord.get(mainIndex).get(tempSize - 1));
            valueSetter.setBestTime(timeRecord.get(mainIndex).get(0));

            valueSetter.setAttempts(tempSize);
            ++mainIndex;
        }

        mainIndex = 0;
        log.debug("Setting the avg time & score");
        for(int i = 0; i < scoreRecord.size(); i++){
            double avgScore = 0;
            double avgTime = 0;
            int size = scoreRecord.get(i).size();
            for (int y = 0; y < scoreRecord.get(i).size(); y++){
                avgScore += scoreRecord.get(i).get(y);
                avgTime += timeRecord.get(i).get(y);
            }
            takenQuizzesDashboardDTOList.get(mainIndex).setAverageScore(avgScore / size);
            takenQuizzesDashboardDTOList.get(mainIndex).setAverageTime(avgTime / size);
            ++mainIndex;
        }
//        for(int i = 0; i < takenQuizzesDashboardDTOList.size(); i++){
//            log.debug("COL: " + i + " JSON:  " + Json.pretty(takenQuizzesDashboardDTOList.get(i)));
//        }
        return takenQuizzesDashboardDTOList;
    }

    @Override
    public TakenQuizzesDashboardDTO takeQuizAverageToTakeQuizzesDashboardDTO(TakeQuizAverage takeQuizAverage) {
        return TakenQuizzesDashboardDTO.builder()
                .userId(takeQuizAverage.getUser().getUserId())
                .avgTakeQuizId(takeQuizAverage.getAvgTakeQuizId())
                .averageScore(takeQuizAverage.getAvgScore())
                .lowestSore(takeQuizAverage.getLowestScore())
                .highestScore(takeQuizAverage.getHighestScore())
                .bestTime(takeQuizAverage.getBestTime())
                .worstTime(takeQuizAverage.getWorstTime())
                .averageTime(takeQuizAverage.getAvgTime())
                .attempts(takeQuizAverage.getAttempts())
                .quizDTO(quizMapper.quizToQuizDTO(takeQuizAverage.getReferenceQuizForAvgScore()))
                .createdBy(userMapper.userTOUserDataDTO(takeQuizAverage
                        .getReferenceQuizForAvgScore().getCreatedBy()))
                .build();
    }


    private int getTimeDiff(TakeQuiz takeQuiz){
        long mill = takeQuiz.getStartedAt().getTime() - takeQuiz.getFinishedAt().getTime();
        int min = (int) (mill / 60000);
        return (min < 0) ? ((-1)*min) : min;
    }

    @Autowired
    @Qualifier("delegate")
    public void setQuizMapper(QuizMapper quizMapper){
        this.quizMapper = quizMapper;
    }
}
