package com.ssafy.sgdc.competition.dto;

import com.ssafy.sgdc.domain.entity.Matching;
import com.ssafy.sgdc.domain.entity.enums.CompetKind;
import com.ssafy.sgdc.domain.entity.enums.IsSender;
import com.ssafy.sgdc.domain.entity.enums.MatchStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MatchingDto {

    private int matchingId;
    private int userId;
    private int competitionId;
    private int categoryId;
    private CompetKind competKind;
    private IsSender isSender;
    private LocalDateTime competExpirationTime;
    private MatchStatus matchStatus;

    public static MatchingDto of(Matching matching) {
        return new MatchingDto(
                matching.getMatchingId(),
                matching.getUser().getUserId(),
                matching.getCompetition().getCompetId(),
                matching.getCategory().getCategoryId(),
                matching.getCompetKind(),
                matching.getIsSender(),
                matching.getCompetExpirationTime(),
                matching.getMatchStatus()
        );
    }

}
