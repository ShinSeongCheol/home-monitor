package com.seongcheol.homemonitor.dto.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UltraSrtNcstResponseDto {
    private Response response;

    @Getter
    @ToString
    public static class Response {
        private Header header;
        private Body body;
    }

    @Getter
    @ToString
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Getter
    @ToString
    public static class Body {
        private String dataType;
        private Items items;
        private int pageNo;
        private int numOfRows;
        private int totalCount;
    }

    @Getter
    @ToString
    public static class Items {
        @JsonProperty("item")
        private List<Item> itemList;
    }

    @Getter
    @ToString
    public static class Item {
        private String baseDate;
        private String baseTime;
        private String category;
        private int nx;
        private int ny;
        private String obsrValue;
    }
}
